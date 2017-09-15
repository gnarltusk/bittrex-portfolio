var serverUrl = process.argv[2] || 'localhost';
var api = require('./server/api.js');
var startup = require('./server/startup.js');

startup.initialize(serverUrl)
.then(api.init);