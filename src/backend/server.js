var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server, not HTTP server
});
var privateKey  = fs.readFileSync('./key.pem', 'utf8');
var certificate = fs.readFileSync('./cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var app2 = express();

//pass in your express app and credentials to create an https server
var httpsServer = https.createServer(credentials, app2);
httpsServer.listen(1337, function() {
    console.log((new Date()) + "Secure Server is listening on port " + 1337);
});

/**
 * WebSocket server
 */

var clients = [];

var wsServer = new WebSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket request is just
  // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  // accept connection - you should check 'request.origin' to make sure that
  // client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin);
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;

  console.log((new Date()) + ' Connection accepted.');

  // user sent some message
  connection.on('message', function(message) {
    if (message.type === 'utf8') { // accept only text

        console.log((new Date()) + ' ' + message.utf8Data);

        // broadcast message to all connected clients
        var json = JSON.stringify({ type:'message', data: message });
        for (var i=0; i < clients.length; i++) {
          clients[i].sendUTF(json);
        }
    }
  });

  // user disconnected
  connection.on('close', function(connection) {
      console.log((new Date()) + " Peer "
      + connection.remoteAddress + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
  });

});

var express = require('express');
var app = express();
var httpServer = http.Server(app);
express.static.mime.define({'application/octet-stream': ['ttf']});
app.use(express.static('./'));

app.get('/', function(req, res){
    res.sendfile('./index.html');
});
app.listen(process.env.PORT || 3000);