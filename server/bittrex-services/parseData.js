var getUsdValue = function getUsdValue(value, btcPrice) {
  return Math.round(value * btcPrice * 100)/100;
}

var formatNumber = function formatNumber(number) {
  return Number(number).toFixed(8);
}
var getBalances = function getBalances(responseData) {
  var btcPrice = responseData[0];
  var balances = responseData[1];
  var openOrders = responseData[2];
  var marketHistory = responseData[3];
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

module.exports = {
  getBalances: getBalances,
};