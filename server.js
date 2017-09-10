var serverUrl = process.argv[2] || 'localhost';
var startup = require('./server/startup.js');
var bittrexCrud = require('./server/bittrex-services/crud.js');

 
startup.initialize(serverUrl)
.then(bittrexCrud.init);
