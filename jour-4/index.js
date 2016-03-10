/**
 * Created by leojpod on 3/10/16.
 */
var async = require('async');
var MongoClient= require('mongodb').MongoClient;

var db;

var url = "mongodb://localhost:27017";

MongoClient.connect( url + '/client', function (err, db) {

  var nouveauClients = [
      { 'clientId': "1", 'nom': 'Richardson', 'depenses': '300' },
      { 'clientId': "2", 'nom': 'Fred', 'depenses': '600'},
      { 'clientId': "3", 'nom': 'Alex', 'depenses': '400'},
      { 'clientId': "4", 'nom': 'Niah', 'depenses': '500'},
      { 'clientId': "5", 'nom': 'Léo', 'depenses': '1000'}
    ];

  db.collection('client').insertMany(nouveauClients, function (err, results){
    console.log(results);
  });

});
