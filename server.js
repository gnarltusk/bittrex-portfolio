var serverUrl = process.argv[2] || 'localhost';
var startup = require('./server/startup.js');
var fs = require('fs');
var bittrex = require('node.bittrex.api');

var _loadApiKeys = function() {
  return new Promise(function (resolve, reject){
   fs.readFile('api-keys.json', function(err, data) {
      if (err) throw err;
      resolve(JSON.parse(data));
    });
  });
 };

startup.initialize(serverUrl)
.then(_loadApiKeys)
.then(function(keys){
  bittrex.options(keys);  
  bittrex.getbalances( function( data, err ) {
    console.log( data );
  });
});
