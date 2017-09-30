var fs = require('fs');
var promise = require('promise');
var smidgen = require('smidgen');
var generateSeed = function generateSeed() {
  return new Promise(function (resolve, reject){
    conf = { json: true }
    smidgen.load(conf, (err, smidgen) => {
      smidgen.commands['generate-seed'](smidgen.iota, conf, (err, res) => {
        resolve(res)
      })
    })
  });    
};

module.exports = {
  generateSeed: generateSeed
};