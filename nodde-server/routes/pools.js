/**
 * Created by leojpod on 3/2/16.
 */

var express = require('express');
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var ObjectId = require('mongodb').ObjectID;

var router = express.Router();

var PoolSerializer = require('../serializers/pool-serializer');
var mockupData = require('../mock-up-data');
var authentication = require('../authentication.js');
var async = require('async');

router.use(authentication.authenticatedRoute);

router.get('/', function (req, res, next) {
  var db = req.db;
  db.collection('pools').find().toArray(function (err, pools) {
    //we now need to fetch all the user information to "populate" the pools array with user data
    if (err) throw err;
    async.map(pools, function (pool, cb) {
      db.collection('users').find(ObjectId(pool.author)).limit(1).toArray(function (err, users) {
        if (err) throw err;
        pool.author = users[0];
        cb(null, pool);
      });
    }, function (err, poolsWithUser) {
      if (err) throw err;
      res.json(PoolSerializer.serialize(poolsWithUser));
    });
  });
});

router.post('/', function (req, res, next) {
  //validate the incomming data:
  req.checkBody('data.type', 'not a pool record').equals('pools');
  req.checkBody('data.attributes.title', 'missing').isLength({min: 1});
  req.checkBody('data.attributes.questions', 'missing').notEmpty();
  new JSONAPIDeserializer({
    users: {
      valueForRelationship: function (relationship) {
        return relationship.id;
      }
    }
  }).deserialize(req.body, function (err, pool) {
    if (err) {
      res.status(400).json({errors: 'malformed JSON-API resource'});
    }
    var db = req.db;
    console.log('pool', pool);
    console.log('arguments -> ', arguments);
    db.collection('pools').insertOne(pool, function (err, result) {
      if (err) throw err;
      res.json(PoolSerializer.serialize(result.ops[0]));
    });
  });
});

router.get('/:id', function (req, res, next) {
  req.checkParams('id', 'not a valid ObjectId').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.status(403).json({ success: false, errors: errors });
    return;
  }
  var db = req.db;
  var id = ObjectId(req.params.id);
  db.collection('pools').find(id).toArray(function(err, pools) {
    if (err) throw err;
    if (pools.length > 0) {
      var pool = pools[0];
      //fetch its user:
      db.collection('users').find(ObjectId(pool.author)).toArray(function (err, users) {
        if (err) throw err;
        // else there should be a user
        pool.author = users[0];
        res.json(PoolSerializer.serialize(pool));
      });
    } else {
      res.json(PoolSerializer.serialize(null));
    }
  });
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
