/**
 * Created by leojpod on 3/2/16.
 */

var express = require('express');
var router = express.Router();

var PoolSerializer = require('../serializers/pool-serializer');

var mockupData = require('../mock-up-data');
var authentication = require('../authentication.js');

router.use(authentication.authenticatedRoute);

router.get('/', function (req, res, next) {
  var pools = mockupData.pools;
  var jsonMessage = PoolSerializer.serialize(pools);
  res.json(jsonMessage);
});
router.post('/', function (req, res, next) {
  res.status(500).json({ error: 'unimplemented'}).end();
});

router.get('/:id', function (req, res, next) {
  var id = Number.parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({error: 'the segment should be an integer'});
    return;
  }
  var pool = null;
  for (var i = 0; i < mockupData.pools.length && pool === null; i ++) {
    if (mockupData.pools[i].id === id) {
      pool = mockupData.pools[i];
    }
  }

  var jsonMessage = PoolSerializer.serialize(pool);
  res.json(jsonMessage);
});
router.get('/:id/answers', function (req, res, next) {
  res.status(500).json({ error: 'unimplemented'}).end();
});
router.post('/:id/answers', function (req, res, next) {
  res.status(500).json({ error: 'unimplemented'}).end();
});
router.get('/:id/results', function (req, res, next) {
  res.status(500).json({ error: 'unimplemented'}).end();
});

module.exports = router;
