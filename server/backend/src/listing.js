const db = require('./db');
const request = require('request');
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({ apiKey: 'AIzaSyAv1rEnbIviSPmo6QFp9mo1hwwWu1pAfS4' });

exports.getAll = async (req, res) => {
  const listings = await db.selectListings();
  if (listings.length == 0) {
    res.status(404).send();
  } else {
    res.status(200).json(listings);
  }
};

exports.postListing = async (req, res) => {
  if (isValidObj(req.body)) {
    let lat, long;
    console.log('about to geocode');
    let test = req.body.address;
    try {
      const response = await client.geocode({ params: { address: test, key: 'AIzaSyAv1rEnbIviSPmo6QFp9mo1hwwWu1pAfS4' } });
      console.log(response.data.results[0].geometry.location.lat);
      if(response.data.status != 'ZERO_RESULTS') {
        lat = response.data.results[0].geometry.location.lat;
        long = response.data.results[0].geometry.location.lng;
      } else {
        console.log('address not found');
      }
    } catch (error) {
      console.log(error);
      res.status(400).send();
      return;
    }
    const obj = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date: new Date(),
      requests: req.body.requests,
      state: 'No Offers Made',
      giveaway: req.body.giveaway,
      user: req.body.user,
      latitude: lat || null,
      longitude: long || null,
    };
    const id = await db.inputListing(obj);
    obj.id = id.id;
    res.status(201).json({ ...obj });
  } else {
    console.log('A postg bad request has happened');
    res.status(400).send();
  }
};

exports.deleteListing = async (req, res) => {
  console.log("deleteListing");
  const deletedId = await db.deleteListing(req.params.id);
  if (deletedId) {
    res.status(200).send();
  } else {
    res.status(400).send()
  }
};

exports.getId = async (req, res) => {
  const listing = await db.findListingsById(req.params.id);
  if (listing != undefined) {
    res.status(200).json(listing);
  } else {
    res.status(404).send();
  }
};


exports.uploadImage = async (req, res) => {
  //second implementation
  const biData = await sharp(req.file.path).toBuffer();
  //second implementation
  const name = req.file.originalname;
  const id = await db.postImg(biData, name);
  res.status(200).json({...id.id});
}

function isValidObj(obj) {
  if (
    obj.hasOwnProperty('title') &&
    obj.hasOwnProperty('image') &&
    obj.hasOwnProperty('description') &&
    obj.hasOwnProperty('requests') && 
    obj.hasOwnProperty('giveaway') &&
    obj.hasOwnProperty('user') &&
    obj.hasOwnProperty('address')
  ) {
    if (Object.keys(obj).length == 7) {
      return true;
    } else {
      console.log("failed length");
      return false;
    }
  } else {
    console.log("properties failed");
    return false;
  }
};

function isValidImage(obj) {
  if (
    obj.hasOwnProperty('originalname') && 
    obj.hasOwnProperty('buffer')
  ) {
    return true;
  } else {
    return false;
  }
};


function geocode(address, callback) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to geocoding service', undefined);
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find location', undefined);
    } else if (body.status === 'OK') {
      const location = body.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      const formattedAddress = body.results[0].formatted_address;

      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: formattedAddress
      });
    }
  });
}
