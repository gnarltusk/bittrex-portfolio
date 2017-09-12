define([
  'lodash',
], function(_) {
  'use strict';

  var portfolioBalanceVMServiceImpl = function portfolioBalanceVMServiceImpl() {
    var formatBalanceData = function formatBalanceData(storeData) {
      var balances = storeData.portfolioStore.balances;
      var balanceData = []
      var titles = [
        {
          name: 'currency',
          label: 'Currency'
        },
        {
          name: 'balance',
          label: 'Balance'
        },
        {
          name: 'usdValue',
          label: 'USD Value'
        }
      ]
      for(var coin in balances) {
        var wallet = balances[coin];
        wallet.currency = coin;
        balanceData.push(wallet);
      }
      return {
        data: balanceData,
        titles: titles
      }
    };
  
    return {
      formatBalanceData: formatBalanceData
    }
  };

  return portfolioBalanceVMServiceImpl;
});
