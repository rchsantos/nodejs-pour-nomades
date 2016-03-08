/**
 * Created by leojpod on 2/22/16.
 */

var http = require('http');
var qs = require('querystring');
var url = require('url');
var routing = require('./routing.js').routing;

var corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:4200",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Max-Age": '86400', // 24 hours
  "Access-Control-Allow-Headers":
    "X-Requested-With, Access-Control-Allow-Origin," +
    " X-HTTP-Method-Override, Content-Type, Authorization, Accept, x-access-token"
};

http.createServer(function(request, response) {
  //TODO assurer vous de toujours renvoyer les CORS header dans votre response

  //notre API fonctionne en JSON: on peut fixer le header une fois pour toute
  response.setHeader('Content-Type', 'application/json');

  //TODO analyser et extraire les informations sur la requête,
  // surcharger request avec et appeler:
  //    routing.routeRequest(request, response);
  // ! un cas particuler: si la requête est de type OPTIONS:
  // pas la peine d'aller plus loin, il suffit d'envoyer les headers CORS
}).listen(8888);
