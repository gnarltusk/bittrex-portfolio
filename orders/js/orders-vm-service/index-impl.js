define([
  'lodash',
], function(_) {
  'use strict';

  var ordersVMServiceImpl = 
  function ordersVMServiceImpl(bittrexCrudService, ordersStoreActions) {
    var init = function init() {
      ordersStoreActions.initStore();
      bittrexCrudService.getOrders()
      .then(ordersStoreActions.updateOrders);
    }
    return {
      init: init
    }
  };

  return ordersVMServiceImpl;
});
