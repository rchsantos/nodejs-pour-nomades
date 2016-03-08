/**
 * Created by leojpod on 2/23/16.
 */
var jwt = require('jsonwebtoken');

var mockUpData = require('./../mock-up-data');
var config = require('./../config');

var authentication = {
  authenticateUser: function(nameOrEmail, candidatePassword) {
    //TODO utiliser le contenu de mockup data pour valider ou refuser
    // l'authentification d'un utilisateur
    return false;
  },

  isRequestAuthenticated: function(req, next) {
    //TODO chercher la présence du token d'authentification dans :
    // - body, query et headers (x-access-token)
    // utiliser jwt.verify pour s'assurer de la validité du token
  },

  handleRequest: function(req, res) {
    console.log('request for authentication');
    //TODO chercher la méthode de la requête et déterminer que faire:
    // - tenter d'authentifier l'utilisateur
    // - vérifier si la requête est authentifiée
    res.writeHead(500);
    res.write('{ "error": "unimplemented"}');
    res.end();
  }
};

module.exports = authentication;
