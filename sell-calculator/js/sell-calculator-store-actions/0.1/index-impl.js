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
          risk: 2,
          allocation: 1,
          market: 'BTC-ARK',
          marketPrice: 0.00062993,
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
    var loadCalculator = function loadCalculator(id, data) {
      var storeData = storeService.getStoreData();
      storeData.sellCalculatorStore[id].btcValue = data;    
      storeService.updateStoreData(storeData);
    };
    var updateMarket = function updateMarket(id, market) {
      var storeData = storeService.getStoreData();
      storeData.sellCalculatorStore[id].market = market;    
      storeService.updateStoreData(storeData);
    };
    var updateCapital = function updateCapital(id, capital) {
      var storeData = storeService.getStoreData();
      storeData.sellCalculatorStore[id].capital = capital;    
      storeService.updateStoreData(storeData);
    }
    var updateRisk = function updateRisk(id, risk) {
      var storeData = storeService.getStoreData();
      storeData.sellCalculatorStore[id].risk = risk;    
      storeService.updateStoreData(storeData);
    }
    var updateAllocation = function updateAllocation(id, allocation) {
      var storeData = storeService.getStoreData();
      storeData.sellCalculatorStore[id].allocation = allocation;    
      storeService.updateStoreData(storeData);
    }
    return {
      initStore: initStore,
      loadCalculator: loadCalculator,
      updateMarket: updateMarket,
      updateCapital: updateCapital,
      updateRisk: updateRisk,
      updateAllocation: updateAllocation
    };
  };

  return SellCalculatorStoreActions;
});
