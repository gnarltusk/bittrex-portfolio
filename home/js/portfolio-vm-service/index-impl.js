define([
  'lodash',
], function(_) {
  'use strict';

  var portfolioVMServiceImpl = 
  function portfolioVMServiceImpl(bittrexCrudService, portfolioStoreActions) {
    var init = function init() {
      portfolioStoreActions.initStore();
      bittrexCrudService.getBalances()
      .then(portfolioStoreActions.updateBalances);
    }
    return {
      init: init
    }
  };

  return portfolioVMServiceImpl;
});
