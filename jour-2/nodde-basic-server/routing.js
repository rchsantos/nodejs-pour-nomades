/**
 * Created by leojpod on 2/24/16.
 */
var url = require('url');
var authentication = require('./routes/authenticate');
var pools = require('./routes/pools.js');
var users = require('./routes/users.js');

var router = {
  routeRequest: function(req, res) {
    //TODO analyse the request and based on its URL forward the request
    // and the response to the proper route
  }
};

module.exports = router;
