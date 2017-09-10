var Promise = require('promise');
var socketio = require('socket.io');
var express = require('express');
var app = express();
var path = require('path');

module.exports = {
  initialize: function(serverUrl) {
    return new Promise(function (resolve, reject) {
      var http = require('http');
      var server = http.createServer(app);
      server.listen(3030, serverUrl);
      var io = socketio.listen(server);
      io.set('log level', 1);
      console.log('Server Ready! Go to:', serverUrl + ':' + 3030);
      app.use(express.static(path.join(__dirname, '../')));
      resolve({app: app, io: io});
    });
  }
};
