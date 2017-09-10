var fs = require('fs');
var promise = require('promise');
var bittrex = require('node.bittrex.api');

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
var init = function(res) {
  var io = res.io;
  var app = res.app;
  _loadApiKeys()
  .then(function(keys){
    var moreKeys = keys;
    var allMarkets = [];
    // moreKeys.websockets = {
    //   onConnect: function() {
    //     // bittrex.websockets.subscribe(['BTC-ETH','BTC-SC','BTC-ZEN'], function(data, client) {
    //     //   io.sockets.emit('marketsUpdated', {markets: data});              
    //     // });
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
  var getTicker = function getTicker(currency) {
    return new Promise(function (resolve, reject){
      var market = 'BTC-' + currency;
      bittrex.getticker({market: market}, function (ticker){
        resolve(ticker.result)
      });
     });
  }
  app.post('/User/GetBalances', function (req, res) {
    bittrex.getbalances( function( data, err ) {
      var tickers = [];     
      var filteredBalances = data.result.filter(function(wallet){
        delete wallet.CryptoAddress;
        if(wallet.Balance > 0) {
          if (wallet.Currency !== 'BTC') {
            tickers.push(getTicker(wallet.Currency));
          }
        }
        return wallet.Balance > 0;          
      });

      Promise.all(tickers)
      .then(function(tickerData){
        var btcValues = filteredBalances.map(function(wallet, index){
          if (wallet.Currency !== 'BTC') {
            wallet.btcValue = Number(wallet.Balance * tickerData[index-1].Last).toFixed(8)
          } else {
            wallet.btcValue = Number(wallet.Balance).toFixed(8);       
          }
          return wallet;
        });
        res.send(btcValues)
      });      
    });
  });

};
var getBalances = function getBalances() {

};


module.exports = {
  init: init,
};