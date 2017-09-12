define([
  'lodash'
], function(_) {
  'use strict';
  var PortfolioStoreActions = function PortfolioStoreActions(storeService) {
    var initStore = function initStore() {
      var storeData = storeService.getStoreData();
      if(typeof storeData.portfolioStore === 'undefined') {
        storeData.portfolioStore = {};
      }
      storeService.updateStoreData(storeData);
    };
    var updateBalances = function updateBalances(data) {
      var storeData = storeService.getStoreData();
      storeData.portfolioStore.balances = data;
      storeService.updateStoreData(storeData);
    };
    return {
      initStore: initStore,
      updateBalances: updateBalances
    };
  };

  return PortfolioStoreActions;
});
