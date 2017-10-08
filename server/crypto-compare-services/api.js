global.fetch = require('node-fetch');
var cc = require('cryptocompare');
var ccFormatter = require('./parseData.js');
var qs = require('qs');

var priceFull = function priceFull(req, res) {
  var currency = req.body.currency;
  cc.priceFull(currency, ['USD','BTC'])
  .then(function(prices){
    res.send(prices)
  }, function(data){
    res.send({
      result: 'error',
      message: data
    }); 
  })
};
var getIndicators = function getIndicators(req, res) {
  cc.histoHour('LTC', 'BTC', { exchange: 'BitTrex', limit: 65} )
  .then(function(prices){
    res.send(prices)
  })
};
module.exports = {
  getIndicators: getIndicators,
  priceFull: priceFull
};