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
      app.use('/js', express.static(__dirname + '/js'));
      app.use('/dist', express.static(__dirname + '/../dist'));
      app.use('/css', express.static(__dirname + '/css'));
      app.use('/partials', express.static(__dirname + '/partials'));
      
      app.all('/*', function(req, res, next) {
          // Just send the index.html for other files to support HTML5Mode
          res.sendFile('index.html', { root: __dirname + '../' });
      });
      resolve({app: app, io: io});
    });
  }
};
