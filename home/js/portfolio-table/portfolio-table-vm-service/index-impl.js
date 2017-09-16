define([
  'lodash',
], function(_) {
  'use strict';

  var portfolioTableVMServiceImpl = function portfolioTableVMServiceImpl() {
    var formatTableData = function formatTableData(storeData) {
      var balances = _.cloneDeep(storeData.portfolioStore.balances);
      var tableData = []
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
          name: 'btcValue',
          label: 'BTC Value'
        },
        {
          name: 'usdValue',
          label: 'USD Value'
        },
        {
          name: 'averageProfit',
          label: '+/- %'
        }
      ]
      for(var coin in balances) {
        var wallet = balances[coin];
        wallet.currency = coin;
        tableData.push(wallet);
      }
      return {
        data: tableData,
        titles: titles
      }
    };
  
    return {
      formatTableData: formatTableData
    }
  };

  return portfolioTableVMServiceImpl;
});
