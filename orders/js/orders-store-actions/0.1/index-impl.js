define([
  'lodash'
], function(_) {
  'use strict';
  var OrdersStoreActions = function OrdersStoreActions(storeService) {
    var initStore = function initStore() {
      var storeData = storeService.getStoreData();
      if(typeof storeData.ordersStore === 'undefined') {
        storeData.ordersStore = {};
      }
      storeService.updateStoreData(storeData);
    };
    var updateBalances = function updateBalances(data) {
      var storeData = storeService.getStoreData();
      storeData.ordersStore.balances = data;
      storeService.updateStoreData(storeData);
    };
    return {
      initStore: initStore,
      updateBalances: updateBalances
    };
  };

  return OrdersStoreActions;
});
