var express = require('express');
var router = express.Router();

/* GET Authenticate. */
router.get('/', function(req, res, next) {
  res.status(200).send('ça marche le GET');
});

/* post Authenticate. */
router.post('/', function(req, res, next) {
  res.status(200).send('ça marche le POST');
});

module.exports = router;
