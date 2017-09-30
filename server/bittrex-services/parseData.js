var getUsdValue = function getUsdValue(value, btcPrice) {
  return Math.round(value * btcPrice * 100)/100;
}

var formatNumber = function formatNumber(number) {
  return Number(number).toFixed(8);
}
var getChange = function getChange(currentValue, limit) {
  var roundedChange = 0;
  if (limit > 0) {
    var change = (currentValue - limit)/limit;
    roundedChange = Math.round(change*10000)/100;
  }
  return roundedChange;
}
var getBalances = function getBalances(responseData) {
  var btcPrice = responseData[0];
  var balances = responseData[1];
  var marketHistory = responseData[3];
  var orderHistory = getOrderHistory(responseData[2]);
  var currencies = {};
  balances.forEach(function(wallet, index) {
    var history = marketHistory[index];
    var averageOrders = orderHistory[history.MarketName];
    var commission = 0;
    var averageBuy = 0;
    var lastBuy = 0;
    if (typeof averageOrders !== 'undefined') {
      commission = averageOrders.commission;
      averageBuy = averageOrders.averageBuy;
      if(typeof averageOrders.buy[0] !== 'undefined') {
        lastBuy = averageOrders.buy[0].pricePerUnit;
      }
    }
    currencies[wallet.Currency] = {
      last: history.Last,
      balance: formatNumber(wallet.Balance),
      commission: commission,
      averageBuy: formatNumber(averageBuy),
      averageProfit: getChange(history.Last, averageBuy)
    }
    if(wallet.Currency === 'BTC') {
      currencies[wallet.Currency].btcValue = formatNumber(wallet.Balance)
      currencies[wallet.Currency].averageProfit = 0;
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

var getOrderHistory = function getOrderHistory(responseData) {
  var orders = {};
  var orderHistory = responseData;
  //var marketSummary = responseData[1];
  orderHistory.forEach(function(order) {
    if(!orders[order.Exchange]) {
      orders[order.Exchange] = {
        buy: [],
        commission: 0
      };
    }
    var orderObj = {
      quantity: order.Quantity,
      commission: order.Commission,
      price: order.Price,
      pricePerUnit: order.PricePerUnit,
    }
    if(order.OrderType === 'LIMIT_BUY') {
      orders[order.Exchange].buy.push(orderObj);
    }
    orders[order.Exchange].commission += order.Commission;
  });
  for(var i in orders) {
    var market = orders[i];
    var totalBuy = market.buy.reduce(function (a, b) {
      return a + b.quantity;
    }, 0);

    var averageBuy = market.buy.reduce(function (a, b) {
      return a + ((b.quantity / totalBuy) * b.pricePerUnit);
    }, 0);
    market.averageBuy = averageBuy;
  };
  // for(var i in orders) {
  //   var market = orders[i];
  //   var totalBuy = market.buy.reduce(function (a, b) {
  //     return a + b.quantity;
  //   }, 0);
  //   var totalSell = market.sell.reduce(function (a, b) {
  //     return a + b.quantity;
  //   }, 0);

  //   var averageBuy = market.buy.reduce(function (a, b) {
  //     return a + ((b.quantity / totalBuy) * b.pricePerUnit);
  //   }, 0);

  //   var averageSell = market.sell.reduce(function (a, b) {
  //     return a + ((b.quantity / totalSell) * b.pricePerUnit);
  //   }, 0);

  //   var totalProfitLoss = 0; //average sell/bu
  //   market.averageBuy = averageBuy;
  //   market.averageSell = averageSell;
  //   market.totalProfit = Math.round((averageSell - averageBuy)/averageBuy*10000)/100;
  //   var quantity = totalBuy - totalSell;
  //   market.quantity = quantity;
  //   market.theoreticalProfit = 0;
  //   if(quantity > 0) {
  //     var currentPrice = marketSummary.Last;
  //     var theoreticalOrder = market.sell.concat([{
  //       quantity: quantity, 
  //       pricePerUnit:currentPrice,
  //       price: currentPrice * quantity,
  //       commission: (currentPrice * quantity) * .00025
  //     }]);
  //     var theoreticalTotal = theoreticalOrder.reduce(function (a, b) {
  //       return a + b.quantity;
  //     }, 0);
  //     var theoreticalSell = theoreticalOrder.reduce(function (a, b) {
  //       return a + ((b.quantity / theoreticalTotal) * b.pricePerUnit);
  //     }, 0);
  //     market.theoreticalProfit = Math.round((theoreticalSell - averageBuy)/averageBuy*10000)/100;
  //     market.totalBuy = market.buy.reduce(function (a, b) {
  //       return a + b.price;
  //     }, 0);
  //     market.theoreticalSell = theoreticalOrder.reduce(function (a, b) {
  //       return a + b.price;
  //     }, 0);
  //   }
  // }
  return orders;
};
var getIndicators = function getIndicators(data) {
  var indicators = {};
  indicators.rsi = [],
  console.log(data);
  return indicators;
}
module.exports = {
  getBalances: getBalances,
  getOrders: getOrders,
  getOrderHistory: getOrderHistory,
  getIndicators: getIndicators
};