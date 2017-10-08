var fs = require('fs');
var promise = require('promise');
var bittrex = require('node-bittrex-api');
var parser = require('./parseData.js');

var _loadApiKeys = function() {
  return new Promise(function (resolve, reject){
   fs.readFile('api-keys.json', function(err, data) {
      if (err) throw err;
      resolve(JSON.parse(data));
    });
  })
  .then(bittrex.options);
 };

var getBTCValue = function getBTCValue() {
  return new Promise(function (resolve, reject){
      bittrex.getticker({market: 'USDT-BTC'}, function (ticker){
        resolve(ticker.result.Last);
      });
    });
};

var getMarketSummary = function getMarketSummary(market) {
  return new Promise(function (resolve, reject){
      bittrex.getmarketsummary({market: market}, function (ticker){
        if(ticker) {
          resolve(ticker.result[0]);
        } else {
          resolve({
            result: 'error'
          });
        }
      });
    });
};

var getOpenOrders = function getOpenOrders() {
  return new Promise(function (resolve, reject){
      bittrex.getopenorders({}, function (ticker){
        resolve(ticker.result);
      });
    });
};

var getLatestTick = function getLatestTick(market, interval) {
  return new Promise(function (resolve, reject){
    var url = 'https://bittrex.com/Api/v2.0/pub/market/GetLatestTick?' +
    'marketName=' + market +
    '&tickInterval=' + interval;
    bittrex.sendCustomRequest( url, function( data, err ) {
      resolve(data.result[0]);
    });
  });
};

var getCandles = function getCandles(market, interval, _limit) {
  var limit = _limit || null;
  return new Promise(function (resolve, reject){
    bittrex.getcandles({
      marketName: market,
      tickInterval: interval
    }, function( data, err ) {
      var results = data.result;
      if(limit) {
        results = data.result.splice(-limit, limit)
      }
      resolve(results);
    });
  });
};

var getPriceHistory = function getPriceHistory(currency) {
  var market = 'BTC-' + currency;
  if(currency === 'BTC') {
    market = 'USDT-BTC';
  }
  var promises = [
    getCandles(market, 'fiveMin', 6),
    getCandles(market, 'hour', 65),
  ];
  return Promise.all(promises);
}
var getOrderHistory = function getOrderHistory(_marketPair) {
  var marketPair = {};
  if(typeof _marketPair !== 'undefined') {
    marketPair = {
      market: _marketPair
    }
  }

  return new Promise(function (resolve, reject){
    bittrex.getorderhistory(marketPair, function(data){
      resolve(data.result);
    });
  });
}

var getBalances = function getBalances() {
  return new Promise(function (resolve, reject){
    bittrex.getbalances(function (data){
      var filteredBalances = data.result.filter(function(wallet){
        return wallet.Balance > 0;          
      });
      resolve(filteredBalances)
    });
  });
};

module.exports = {
  _loadApiKeys: _loadApiKeys,
  getBalances: getBalances,
  getCandles: getCandles,
  getPriceHistory: getPriceHistory,
  getLatestTick: getLatestTick,
  getOpenOrders: getOpenOrders,
  getOrderHistory: getOrderHistory,
  getMarketSummary: getMarketSummary,
  getBTCValue: getBTCValue
};