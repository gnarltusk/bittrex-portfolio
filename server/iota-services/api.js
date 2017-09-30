
var bittrexCrud = require('./crud.js');
var smidgen = require('smidgen');

var generateSeed = function generateSeed(req, res) {
  var conf = { 
    json: true 
  };
  
  smidgen.load(conf, function(err, smidgen) {
    smidgen.commands['generate-seed'](smidgen.iota, conf, function(err, data) {
      res.send(data)    
    });
  })
};
var getBalance = function getBalance(req, res) {
  var seed = req.body.seed;
  var conf = { 
    json: true, 
    threshold: 49 
  };
   
  smidgen.load(conf, function(err, smidgen) {
    smidgen.commands['get-balance']
    .getBalanceForAddress(smidgen.iota, conf, seed, function(err, data) {
      res.send(data);
    })
  });
};
module.exports = {
  generateSeed: generateSeed,
  getBalance: getBalance
};