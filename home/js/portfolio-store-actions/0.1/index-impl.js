define([
  'lodash'
], function(_) {
  'use strict';
  var PortfolioStoreActions = function PortfolioStoreActions(storeService) {
    var initStore = function initStore(id) {
      var storeData = storeService.getStoreData();
      if(typeof storeData.portfolioStore === 'undefined') {
        storeData.portfolioStore = {};
      }
      if(typeof storeData.portfolioStore[id] === 'undefined') {
        storeData.portfolioStore[id] = {};
      }
      storeService.updateStoreData(storeData);
    };
    var updateBalances = function updateBalances(id, data) {
      var storeData = storeService.getStoreData();
      storeData.portfolioStore[id].balances = data;
      storeService.updateStoreData(storeData);
    };
    return {
      initStore: initStore,
      updateBalances: updateBalances
    };
  };

  return PortfolioStoreActions;
});
