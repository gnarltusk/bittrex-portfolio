module.exports = {
  initialize: function(serverUrl) {
    var http = require('http');
    var server = http.createServer(require('./routes.js').init);
    server.listen(3030, serverUrl);
    console.log('Server Ready! Go to:', serverUrl + ':' + 3030);
  }
};
