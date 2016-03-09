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
    var segments = req.url.pathname.split('/');
    switch (segments[1]) {
      case 'authenticate':
        authentication.handleRequest(req, res);
        break;
      case 'pools':
        pools.handleRequest(req, res);
        break;
      case 'users':
        users.handleRequest(req, res);
        break;
      default:
        //unknown route:
        res.writeHead(404);
        res.write('{ "error": "unknown route"}');
        res.end();
    }
  }
};

module.exports = router;
