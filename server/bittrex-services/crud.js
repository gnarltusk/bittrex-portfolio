var fs = require('fs');
var promise = require('promise');
var bittrex = require('node.bittrex.api');
var parser = require('./parseData.js');

var _loadApiKeys = function() {
  return new Promise(function (resolve, reject){
   fs.readFile('api-keys.json', function(err, data) {
      if (err) throw err;
      resolve(JSON.parse(data));
    });
  });
 };

var login = function login() {

};
var balances
var init = function(res) {
  var io = res.io;
  var app = res.app;
  _loadApiKeys()
  .then(function(keys){
    var moreKeys = keys;
    var allMarkets = [];
    // moreKeys.websockets = {
    //   onConnect: function() {
        
    //     bittrex.websockets.listen(function(data, client) {
    //       var emittingData = {};
    //       if (data.M === 'updateSummaryState') {
    //         data.A.forEach(function(data_for) {
    //           data_for.Deltas.forEach(function(marketsDelta) {
    //             if(marketsDelta.MarketName === 'BTC-OMG'){
    //               emittingData[marketsDelta.MarketName] = marketsDelta;
    //               io.sockets.emit('marketsUpdated',emittingData);                  
    //             }
    //           });
    //         });
    //       }
    //     });
    //   },
    //   onDisconnect: function() {
    //     console.log('Websocket disconnected');
    //   }
    // }
    bittrex.options(moreKeys);      

    // var websocketClient;
    // bittrex.websockets.client(function(client) {
    //   websocketClient = client;
    // });
  
  });
  var getBTCValue = function getTicker() {
    return new Promise(function (resolve, reject){
      bittrex.getticker({market: 'USDT-BTC'}, function (ticker){
        resolve(ticker.result.Last);
      });
     });
  }
  var getTicker = function getTicker(currency) {
    return new Promise(function (resolve, reject){
      var market = 'BTC-' + currency;
      if(currency === 'BTC') {
        market = 'USDT-BTC'
      }
      bittrex.getticker({market: market}, function (ticker){
        resolve(ticker.result)
      });
     });
  };
  var getMarketSummary = function getMarketSummary(currency) {
    return new Promise(function (resolve, reject){
      var market = 'BTC-' + currency;
      if(currency === 'BTC') {
        market = 'USDT-BTC'
      }
      bittrex.getmarketsummary({market: market}, function (ticker){
        resolve(ticker.result[0])
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
  app.post('/User/GetBalances', function (req, res) {
    var promises = [
      getBTCValue(),
      getBalances(),
      getOpenOrders(),
    ];
    var responseData = [];
    Promise.all(promises)
    .then(function(data){
      responseData = data;
      var history = [];
      var summary = []
      var wallets = data[1];
      wallets.forEach(function(wallet) {
        summary.push(getMarketSummary(wallet.Currency));    
        history.push(getPriceHistory(wallet.Currency));    
      });
      Promise.all(summary)
      .then(function(summaries){
        responseData.push(summaries);        
        Promise.all(history)
        .then(function(histories){
          responseData.push(histories);
          var formatted = parser.getBalances(responseData);
          res.send(formatted);     
        });
      });
    })
  });
};


module.exports = {
  init: init,
};