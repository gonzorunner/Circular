const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });
const request = require('request');
const endpointUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
// const dummy = require('./dummy');
// const {authenticate, signUp, loggedInUsersOnly} = require('./auth');
// const {user} = require('./user');
const listing = require('./listing');
const offer = require('./offer');
const notifications = require('./notifications');
// const category = require('./category');
const dummy = require('./dummy');
//
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.get('/v0/dummy', dummy.get);
app.get('/v0/notifications/:user', notifications.getNotifications);
app.put('/v0/notifications/offer_id/:offer_id', notifications.updateNotificationRead);
app.get('/v0/listings', listing.getAll);
app.get('/v0/listing/:id', listing.getId);
app.delete('/v0/listing/:id', listing.deleteListing);
app.post('/v0/listings', listing.postListing);
app.get('/v0/offers/:id', offer.getOffersByListingId);
app.delete('/v0/offers/:id', offer.deleteOffersByListingId);
app.post('/v0/offer', offer.postOffer);
app.post('/v0/test', offer.postTest);
app.post('/v0/uploadImg', upload.single('image'), listing.uploadImage);
app.delete('/v0/offer/:id', offer.deleteOffer)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
      status: err.status,
    });
  });
  
app.get('/v0/geocode/:address', (req, res) => {
  const address = req.params.address;
  // console.log(req);
  // console.log("test");
  request.get({
    url: endpointUrl,
    qs: {
      address: address,
      key: 'AIzaSyAv1rEnbIviSPmo6QFp9mo1hwwWu1pAfS4',
    }
  }, (error, response, body) => {
    if(error) {
      console.error(error);
      res.status(500).send('Error: ' + error.message);
    } else if (response.statusCode !== 200) {
      console.error('Unexpected error:', response.statusCode);
      res.status(500).send('Unexpected error:' + response.statusCode);
    } else {
      const data = JSON.parse(body);
      res.json(data);
    }
  });
});

module.exports = app;
  
  