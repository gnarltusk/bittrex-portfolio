define([
  'lodash'
], function(_) {
  'use strict';
  var SellCalculatorStoreActions = function SellCalculatorStoreActions(storeService) {
    var initStore = function initStore(id) {
      var storeData = storeService.getStoreData();
      if(typeof storeData.sellCalculatorStore === 'undefined') {
        storeData.sellCalculatorStore = {};
      }
      if(typeof storeData.sellCalculatorStore[id] === 'undefined') {
        storeData.sellCalculatorStore[id] = {
          btcValue: 0,
          capital: 0,
          wallet: 0,
          risk: 0,
          riskPct: 2,
          market: '',
          marketPrice: 0,
          units: 0,
          entry: 0,
          target: 0,
          targetPct: 0,
          stop: 0,
          stopPct: 0,
          walletBTC: 0.03581937
        };
      }
      storeService.updateStoreData(storeData);
    };
    var updateCalculator = function updateMarket(id, data) {
        var storeData = storeService.getStoreData();
        storeData.sellCalculatorStore[id] = data
        storeService.updateStoreData(storeData);
    };
    
    return {
      initStore: initStore,
      updateCalculator: updateCalculator
    };
  };

  return SellCalculatorStoreActions;
});
