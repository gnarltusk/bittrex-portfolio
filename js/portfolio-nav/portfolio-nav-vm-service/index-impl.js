define([
  'lodash',
], function(_) {
  'use strict';

  var portfolioNavVMServiceImpl = function portfolioNavVMServiceImpl() {
    var formatNavData = function formatNavData(storeData) {
      var balances = _.cloneDeep(storeData.portfolioStore.balances);
      var navData = []
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
        navData.push(wallet);
      }
      return {
        data: navData,
        titles: titles
      }
    };
  
    return {
      formatNavData: formatNavData
    }
  };

  return portfolioNavVMServiceImpl;
});
