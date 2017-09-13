define([
  'lodash',
], function(_) {
  'use strict';

  var ordersTableVMServiceImpl = function ordersTableVMServiceImpl() {
    var formatTableData = function formatTableData(storeData) {
      var balances = _.cloneDeep(storeData.ordersStore.balances);
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
          name: 'usdValue',
          label: 'USD Value'
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

  return ordersTableVMServiceImpl;
});
