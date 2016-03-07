var express = require('express');
var router = express.Router();

/* POST Pools. */
router.post('/', function(req, res, next) {
  res.status(200).send('ça marche le Pools POST');
});

router.get('/', function(req, res, next) {
  res.status(200).send('ça marche le Pools POST');
});

module.exports = router;
