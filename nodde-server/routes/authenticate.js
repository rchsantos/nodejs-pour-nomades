/**
 * Created by leojpod on 3/2/16.
 */

var express = require('express');
var jwt = require('jsonwebtoken');

var mockupData = require('../mock-up-data.js');
var config = require('../config.js');
var authentication = require('../authentication.js');

var router = express.Router();

router.get('/', function(req, res, next) {
  authentication.checkAuthentication(req, function (isAuth) {
    if (isAuth === false) {
      res.json({success: false, message: "you are not authenticated"});
    } else {
      res.json({success: true});
    }
  });
});

router.post('/', function(req, res, next) {
  var identifier = req.body.identifier,
    password = req.body.password;

  if (!identifier) {
    res.json(400, { error: 'missing required parameter: identifier' });
    return;
  }
  if (!password) {
    res.json(400, { error: 'missing required parameter: identifier' });
    return;
  }

  //browse users and try finding the good one
  var user = null;
  for (var name in mockupData.users) {
    if (mockupData.users.hasOwnProperty(name)) {
      if (mockupData.users[name].email == identifier ||
        mockupData.users[name].name == identifier) {
        user = mockupData.users[name];
        break;
      }
    }
  }

  //did we find the user?
  if (user === null || user.password !== password) {
    //kick them out
    res.json(403,{
      success: false,
      message: "wrong combination of password/identification"
    });
  } else {
    //authenticate
    var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
    res.json({ success: true, token: token });
  }
});

module.exports = router;
