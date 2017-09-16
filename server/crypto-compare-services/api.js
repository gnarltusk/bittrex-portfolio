global.fetch = require('node-fetch');
var cc = require('cryptocompare');
var ccFormatter = require('./parseData.js');
var qs = require('qs');

var priceFull = function priceFull(req, res) {
  var currency = JSON.parse(req.body.currency);
  // var conversion = req.body.conversion;
  // console.log(typeof JSON.parse(req.body.currency));

  cc.priceFull(currency, ['USD','BTC'])
  .then(function(prices){
    res.send(prices)
  })
};

module.exports = {
  priceFull: priceFull
};