//function fibo(n) {
//  if (n < 1) {
//    throw 'Numéro Fibonacci < || == à 0';
//  }
//
//  if (n == 1) {
//    return 0;
//  }
//
//  if (n == 2) {
//    return 1;
//  }
//
//  return fibo(n - 1) + fibo(n - 2);
//
//}

var http = require('http');
var fibo = require('async-fibo');

var clientCount = 0;

function handleRequest(request, response) {

  clientCount ++;

  console.log('incoming request # ' +clientCount);

  response.writeHead(200, {'Content-Type' : 'text/plain'});

  var randInt = Math.ceil(Math.random() * 5 + 35);

  fibo(randInt, function(v) {
    response.write('number fibonacci ' + v);
    response.end();
  });


  console.log('Request %s c\'est fini ', clientCount);
}

var server = http.createServer(handleRequest);
server.listen(8888);

console.log('Server started');


