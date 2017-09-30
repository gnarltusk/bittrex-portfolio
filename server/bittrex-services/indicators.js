var tulind = require('tulind');
var formatCandles = function formatCandles(candles) {
  var close = candles
  .map(function(something){
    return something.C;
  });
  var high = candles
  .map(function(something){
    return something.H;
  });
  var low = candles
  .map(function(something){
    return something.L;
  });
  var vol = candles
  .map(function(something){
    return something.V;
  });
  return {
    close: close,
    high: high,
    low: low,
    volume: vol
  };
};

var getRSI = function getRSI(bittrexCandles) {
  return new Promise(function (resolve, reject){
    var candles = formatCandles(bittrexCandles);
    var close = candles.close;
    tulind.indicators.rsi.indicator([close], [14], function(err, results) {
      var currentRsi = results[0][results[0].length-1];
      var rsi1 = results[0][results[0].length- 1 - (1)];
      var rsi6 = results[0][results[0].length- 1 - (6)];
      var rsi12 = results[0][results[0].length- 1 - (12)];
      var rsi24 = results[0][results[0].length- 1 - (24)];
      var rsi36 = results[0][results[0].length- 1 - (36)];
      var rsi168 = results[0][results[0].length- 1 - (168)];
      resolve({
        rsi: Math.round(currentRsi*100)/100,
        rsi1:Math.round(rsi1*100)/100,
        rsi6:Math.round(rsi6*100)/100,
        rsi12:Math.round(rsi12*100)/100,
        rsi24:Math.round(rsi24*100)/100,
        rsi36:Math.round(rsi36*100)/100,
        rsi168:Math.round(rsi168*100)/100,
      });
    });
  });
};
var getMA = function getMA(bittrexCandles, days) {
  return new Promise(function (resolve, reject){
    var candles = formatCandles(bittrexCandles);
    var close = candles.close;
    tulind.indicators.sma.indicator([close], [15], function(err, results) {
      resolve(results);
    });
  });
};

var getMACD = function getMACD(bittrexCandles, fast, slow, signal) {
  return new Promise(function (resolve, reject){
    var candles = formatCandles(bittrexCandles);
    var close = candles.close;
    console.log(tulind.indicators.macd);
    tulind.indicators.macd.indicator([close],[12,26,9], function(err, results) {
      resolve(results);
    });
  });
};

module.exports = {
  getRSI: getRSI,
  getMA: getMA,
  getMACD: getMACD
};