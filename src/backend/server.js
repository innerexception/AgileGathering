var WebSocketServer = require("websocket").server;
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static('./'));
app.get('/', function(req, res){
    res.sendfile('./index.html');
});

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var clients = [];

var wsServer = new WebSocketServer({httpServer: server});

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