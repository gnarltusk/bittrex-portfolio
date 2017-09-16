
var bittrexCrud = require('./crud.js');
var bittrexFormatter = require('./parseData.js');

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
}
module.exports = {
  getBalances: getBalances,
  getOrders: getOrders,
  getOrderHistory: getOrderHistory,
  loadApiKeys: bittrexCrud._loadApiKeys
};