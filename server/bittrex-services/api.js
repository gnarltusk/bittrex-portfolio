
var bittrexCrud = require('./crud.js');
var bittrexFormatter = require('./parseData.js');
var indicators = require('./indicators.js');
var tulind = require('tulind');
var fs = require('fs');
var getBalances = function getBalances(req, res) {
  var promises = [
    bittrexCrud.getBTCValue(),
    bittrexCrud.getBalances(),
    bittrexCrud.getOrderHistory(),
  ];
  var responseData = [];
  Promise.all(promises)
  .then(function(data){
    responseData = data;
    var wallets = data[1];
    var summary = []
    wallets.forEach(function(wallet) {
      var currency = wallet.Currency;
      var market = 'BTC-' + currency;
      if(currency === 'BTC') {
        market = 'USDT-BTC'
      }
      summary.push(bittrexCrud.getMarketSummary(market));    
    });
    Promise.all(summary)
    .then(function(summaries){
      responseData.push(summaries);
      var formatted = bittrexFormatter.getBalances(responseData);
      res.send(formatted);
    });
  });
};

var getOrders = function getOrders (req, res) {
  var promises = [
    bittrexCrud.getBTCValue(),
    bittrexCrud.getOpenOrders(),
  ];
  var responseData = [];
  Promise.all(promises)
  .then(function(data){
    responseData = data;
    var orders = data[1];
    var summary = []
    orders.forEach(function(wallet) {
      summary.push(bittrexCrud.getMarketSummary(wallet.Exchange));    
    });
    Promise.all(summary)
    .then(function(summaries){
      responseData.push(summaries);
      var formatted = bittrexFormatter.getOrders(responseData);
      res.send(formatted);
    });
  });
};
var getOrderHistory = function getOrderHistory(req, res) {
  var market = 'BTC-OMG';
  var promises = [    
    bittrexCrud.getOrderHistory(market),
    bittrexCrud.getMarketSummary(market)
  ];
  
  Promise.all(promises)
  .then(function(data){
    var formatted = bittrexFormatter.getOrderHistory(data);
    res.send(formatted);
  });
};
var getIndicators = function getIndicators(req, res) {
  bittrexCrud.getCandles('BTC-EDG', 'hour')
  .then(function(data){
    indicators.getMA(data, 15)
    .then(function(data){
      // res.send(data)
    })
    indicators.getRSI(data)
    .then(function(data) {
      //res.send(data)
    });
    indicators.getMACD(data)
    .then(function(data) {
      res.send(data)
    });
  });
  // fs.readFile('server/bittrex-services/mockData.json', 
  // function(err, data) {
  //   if (err) throw err;
  //   // res.send(JSON.parse(data))
  //   bittrexCrud.getCandles('BTC-EDG', 'hour')
  //   .then(indicators.getRSI)
  //   .then(function(data) {
  //     res.send(data)
  //   });
  // });
  // bittrexCrud.getCandles('BTC-LTC', 'hour')
  // .then(function(data) {
  //   var close = data
  //   .map(function(something){
  //     return something.C;
  //   });
  //   var high = data
  //   .map(function(something){
  //     return something.H;
  //   });
  //   var low = data
  //   .map(function(something){
  //     return something.L;
  //   });
  //   var vol = data
  //   .map(function(something){
  //     return something.V;
  //   });
  //   res.send({
  //     close: close,
  //     high: high,
  //     low: low,
  //     volume: vol
  //   })

  // tulind.indicators.stoch.indicator([mockData.high, mockData.low, mockData.close], [14, 3, 1], 
  //   function(err, results) {
  //   // console.log("Result of stochastic oscillator is:");
  //   // console.log(results[0]);
  //   // console.log(results[1]);
  //   res.send(results);
  // });
    // tulind.indicators.rsi.indicator([close], [14], function(err, results) {
    //   console.log("Result of RSI is:");
    //   console.log(results[0].length, close.length);
    //   res.send(results[0]);
    // });
    // tulind.indicators.macd.indicator([close],[12,26,9], function(err, results) {
    //   console.log("Result of MACD is:");
    //   console.log(results[0].length, close.length);
    //   res.send(results[0]);
    // });
    // var formatted = bittrexFormatter.getIndicators(data);
  // });
  
};
module.exports = {
  getBalances: getBalances,
  getOrders: getOrders,
  getOrderHistory: getOrderHistory,
  getIndicators: getIndicators,
  loadApiKeys: bittrexCrud._loadApiKeys
};