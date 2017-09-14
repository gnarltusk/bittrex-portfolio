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
    var updateOrders = function updateOrders(data) {
      var storeData = storeService.getStoreData();
      storeData.ordersStore.orders = data;
      storeService.updateStoreData(storeData);
    };
    return {
      initStore: initStore,
      updateOrders: updateOrders
    };
  };

  return OrdersStoreActions;
});
