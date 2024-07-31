const db = require("./db");

exports.postOffer = async (req, res) => {
  if (isValidOffer(req.body)) {
    const obj = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date: new Date(),
      requestedListingId: req.body.requestedListingId,
      user: req.body.user,
      seen: false,
      accepted: false
    };
    const id = await db.inputOffer(obj);
    obj.id = id.id;
    res.status(201).json({...obj});
  } else {
    res.status(400).send();
  }
};

// returns all offers associated with a particular listing
exports.getOffersByListingId = async (req, res) => {
  const offers = await db.selectOffersByListingId(req.params.id);
  if(offers) {
    res.status(200).json(offers);
  } else {
    res.status(404).send();
  }
};

exports.deleteOffersByListingId = async (req, res) => {
  console.log("deleteOffersByListingId");
  const offers = await db.deleteOffersByListingId(req.params.id);
  if(offers) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
};

exports.postTest = async (req, res) => {
  if(req.body.hasOwnProperty('id')) { 
    const id = await db.inputTest(req.body);
    const obj =id.id;
    res.status(201).json({...obj}); 
  } else {
    res.status(400).send();
  }
};

exports.deleteOffer = async (req, res) => {
  const deletedId = await db.deleteOffer(req.params.id);
  if (deletedId) {
    res.status(200).send();
  } else {
    res.status(400).send()
  }
};

/*
exports.deleteListingOffers = async (listing_id) => {
  const input = "DELETE FROM offer o WHERE o.offer['requestedItem'] = '($1)' RETURNING id";
  const query = {
    text: input,
    values: [listing_id],
  };
  await pool.query(query);
  res.send("Offer deleted")
}
*/

function isValidOffer(obj) {
  if (
    obj.hasOwnProperty('title') &&
    obj.hasOwnProperty('description') &&
    obj.hasOwnProperty('image') &&
    obj.hasOwnProperty('requestedListingId') &&
    obj.hasOwnProperty('user')
  ) {
    if (Object.keys(obj).length == 5) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};