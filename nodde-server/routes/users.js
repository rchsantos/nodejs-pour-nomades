var express = require('express');
var router = express.Router();

var UserSerializer = require('../serializers/user-serializer');

var mockupData = require('../mock-up-data');
var authentication = require('../authentication.js');

router.use(authentication.authenticatedRoute);

/* GET users listing. */
router.get('/', function(req, res, next) {
  var usersData = [];

  for (var name in mockupData.users) {
    if (mockupData.users.hasOwnProperty(name)) {
      usersData.push(mockupData.users[name]);
    }
  }

  var jsonMessage = UserSerializer.serialize(usersData);

  res.json(jsonMessage);
});
router.get('/:id', function(req, res, next) {
  var id = Number.parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({error: 'the segment should be an integer'});
    return;
  }
  var user = null;
  for (var name in mockupData.users) {
    if (mockupData.users.hasOwnProperty(name)) {
      if (mockupData.users[name].id === id) {
        user = mockupData.users[name];
        break;
      }
    }
  }

  var jsonMessage = UserSerializer.serialize(user);

  res.json(jsonMessage);
});

module.exports = router;
