global.fetch = require('node-fetch');
var cc = require('cryptocompare');
var ccFormatter = require('./parseData.js');

var priceFull = function priceFull(req, res) {
  console.log(req.body);
  res.send('something');
  //return cc.priceFull(['BTC', 'ETH'], ['USD', 'EUR'])
};

module.exports = {
  priceFull: priceFull
};