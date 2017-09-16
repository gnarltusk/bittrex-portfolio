var fs = require('fs');
var promise = require('promise');
var bittrexApi = require('./bittrex-services/api.js');
var ccApi = require('./crypto-compare-services/api.js');
var bodyParser = require('body-parser');

var init = function(res) {
  var io = res.io;
  var app = res.app;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  bittrexApi.loadApiKeys();
  app.post('/Bittrex/GetBalances', bittrexApi.getBalances);
  app.post('/Bittrex/GetOrders', bittrexApi.getOrders);
  app.post('/Bittrex/GetOrderHistory', bittrexApi.getOrderHistory);
  app.post('/CC/PriceFull', ccApi.priceFull)
};


module.exports = {
  init: init,
};