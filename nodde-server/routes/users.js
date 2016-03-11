var express = require('express');
var utils = require('util');
var bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectID;

var router = express.Router();

var UserSerializer = require('../serializers/user-serializer');
var authentication = require('../authentication.js');

var User = require('../models/user');

/* GET users listing. */
router.get('/', authentication.authenticatedRoute, function(req, res, next) {
  var db = req.db;
  db.collection('users').find().toArray().then(function(users) {
    //we browse through them all :
    var jsonMessage = UserSerializer.serialize(users);
    res.json(jsonMessage);
  }, function (err) {
    throw err;
  });
});
router.get('/:id', authentication.authenticatedRoute, function(req, res, next) {
  req.checkParams('id', 'not a valid ObjectId').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.status(403).json({ success: false, errors: errors });
    return;
  }
  var db = req.db;
  var id = ObjectId(req.params.id);
  db.collection('users').find(id).limit(1).toArray().then(function (docs) {
    if (docs.length > 0) {
      var user = docs[0];
      res.json(UserSerializer.serialize(user));
    } else {
      res.json(UserSerializer.serialize(null));
    }
  }, function (err) {
    throw err;
  });
});

router.post('/', function(req, res, next) {
  //validate incoming data:
  //we need a user name of min 6 char long
  req.checkBody('data.type', 'not a user record').equals('users');
  req.checkBody('data.attributes.name', 'not alphanumeric').isAlphanumeric();
  req.checkBody('data.attributes.name', 'too short (6 char min)').isLength({
    min: 6,
    max: undefined
  });
  //we need an email that is a proper email
  req.checkBody('data.attributes.email', 'invalid email').isEmail();
  //we need a password that is at least 6 char long
  req.checkBody('data.attributes.password', 'password too short  (6 char min)').isLength({
    min: 6,
    max: undefined
  });

  var errors = req.validationErrors(true);

    //hash password
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) {
        throw err;
      }
      //create new user and insert it
      var newUser = new User ({
        name: name,
        email: email,
        password: hash
      });

      newUser.save(function(err, result) {
        if (err) {
          res.status(500).json({ success: false, error: err });
        } else {
          var jsonMessage = UserSerializer.serialize(newUser);
          res.json(jsonMessage);
        }
      });
    });
});

module.exports = router;
