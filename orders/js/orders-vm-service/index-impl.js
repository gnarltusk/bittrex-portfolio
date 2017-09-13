define([
  'lodash',
], function(_) {
  'use strict';

  var ordersVMServiceImpl = 
  function ordersVMServiceImpl(bittrexCrudService, ordersStoreActions) {
    var init = function init() {
      ordersStoreActions.initStore();
      bittrexCrudService.getBalances()
      .then(ordersStoreActions.updateBalances);
    }
    return {
      init: init
    }
  };

  return ordersVMServiceImpl;
});
