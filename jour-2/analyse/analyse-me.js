/**
 * Created by leojpod on 3/7/16.
 */
var http = require('http');
var url = require('url');
var qs = require('querystring');

function handleRequest(request, response) {
  var bodyString = '';
  //TODO récupérer les informations sur la requete et remplir l'objet suivant:
  var analysisData = {
    method: null,
    url: null,
    path: null,
    params: {
      query: null,
      body: null
    }
  };

  /*TODO
  Une fois le tableau rempli, créer un Object Analysis (new Analysis(analysisData)
  et appeler la méthode displayJSON sur cet objet (il prend en paramètre
  l'objet response

  !! - vous devrez surement placer cet appel dans un callback!
   */
  /*TODO
  changer ensuite le code pour que ces informations soient disponible dans
  l'object request directement (ajouter/modifier dynamiquement des propriétés)
   */

}

var server = http.createServer(handleRequest);
server.listen(8888);

console.log('server started');
