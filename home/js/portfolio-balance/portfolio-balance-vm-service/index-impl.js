define([
  'lodash',
], function(_) {
  'use strict';

  var portfolioBalanceVMServiceImpl = function portfolioBalanceVMServiceImpl() {
    var formatBalanceData = function formatBalanceData(storeData) {
      var balances = storeData.portfolioStore.balances;
      var labels = Object.keys(balances);
      var btcValue = [];
      var totalBTC = 0;
      var totalUSD = 0;
      for(var i in balances) {
        var wallet = balances[i];
        btcValue.push(wallet.btcValue);
        totalBTC += Number(wallet.btcValue);
        totalUSD += Number(wallet.usdValue);
      }
      var btcValue = Object.values(balances).map(function(wallet){
        return wallet.btcValue;
      });
      var chartData = {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: btcValue,
              backgroundColor: [
                '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'
              ]
            }
          ]
        }
      }; 
      return {
        chartData: chartData,
        totalBTC: totalBTC,
        totalUSD: totalUSD
      }
    };
    return {
      formatBalanceData: formatBalanceData
    }
  };

  return portfolioBalanceVMServiceImpl;
});
