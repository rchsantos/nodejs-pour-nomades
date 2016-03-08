/**
 * Created by leojpod on 2/26/16.
 */
var url = require('url');
var mockupData = require('./../mock-up-data.js');
var normalizer = require('../normalizer.js');

var pools = {
    handleRequest: function(req, res) {
      //TODO analyser la requête pour déternimer ce que veut faire l'utilisateur
      // lui envoyer ce qu'il veut
      // N'oubliez pas d'utiliser normalizer pour formatter vos réponses!

      res.writeHead(500, { 'Content-type': 'application/json' });
      res.write(JSON.stringify({ 'error': 'not implemented yet' }));
      res.end();
    },

    getAllPools: function(cb) {
      //TODO récuperer tous les pools de mockupData et récupérer aussi les utilisateurs qui vont avec
      cb(false, [], []);
    },

    getPoolById: function(id, cb) {
      //TODO chercher le sondage qui correspond à l'id et récupérer son auteur
      cb(false, null, null);
    }
  }
  ;

module.exports = pools;
