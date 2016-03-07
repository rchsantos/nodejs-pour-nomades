var http = require('http');

function handleRequest(request, response) {
  response.writeHead(200, {'Content-Type' : 'text/plain'});
  response.end('Hello World !');
}

var server = http.createServer(handleRequest);
server.listen(8888);

console.log('Server started');
