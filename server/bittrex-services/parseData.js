var getUsdValue = function getUsdValue(value, btcPrice) {
  return Math.round(value * btcPrice * 100)/100;
}

var formatNumber = function formatNumber(number) {
  return Number(number).toFixed(8);
}
var getChange = function getChange(currentValue, limit) {
  var change = (currentValue - limit)/limit;
  return Math.round(change*10000)/100;
}
var getBalances = function getBalances(responseData) {
  var btcPrice = responseData[0];
  var balances = responseData[1];
  var marketHistory = responseData[2];
  // var marketChange = responseData[4];
  // var fiveMinutes = marketChange[0];
  // var hours = marketChange[1];
  var currencies = {};
  balances.forEach(function(wallet, index) {
    var history = marketHistory[index];
    // var fiveMinutes = marketChange[index][0];
    // var hours = marketChange[index][1];
    currencies[wallet.Currency] = {
      last: history.Last,
      balance: formatNumber(wallet.Balance)
    }
    if(wallet.Currency === 'BTC') {
      currencies[wallet.Currency].btcValue = formatNumber(wallet.Balance)
    } else {
      currencies[wallet.Currency].btcValue = formatNumber(history.Last * wallet.Balance)     
    }
    currencies[wallet.Currency].usdValue = getUsdValue(currencies[wallet.Currency].btcValue, btcPrice)   
    
  });
  return currencies;
};
var getOrders = function getBalances(responseData) {
  var btcPrice = responseData[0];
  var orders = responseData[1];
  var marketHistory = responseData[2];
  var formattedOrders = [];
  // var marketChange = responseData[4];
  // var fiveMinutes = marketChange[0];
  // var hours = marketChange[1];
  //var currencies = {};
  orders.forEach(function(order, index) {
    var history = marketHistory[index];
    var formattedOrder = {
      exchange: order.Exchange,
      limit: order.Limit,
      quantity: order.Quantity,
      goalChange: getChange(history.Last, order.Limit)
    }
    formattedOrders.push(formattedOrder);
  });
  return formattedOrders;
};
module.exports = {
  getBalances: getBalances,
  getOrders: getOrders
};