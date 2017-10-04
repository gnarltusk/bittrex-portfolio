define([
  'lodash',
], function(_) {
  'use strict';
  var bittrexCrudService;
  var portfolioStoreActions;

  var portfolioVMService = 
  function portfolioVMService(id) {
    this.id = id;
  };

  portfolioVMService.prototype.init = function init() {
    var _this = this;
    portfolioStoreActions.initStore(_this.id);
    bittrexCrudService.getBalances()
    .then(function(data) {
      portfolioStoreActions.updateBalances(_this.id, data);
    });
  };

  return function Factory(_bittrexCrudService, _portfolioStoreActions) {
    var instances = {};
    bittrexCrudService = _bittrexCrudService;
    portfolioStoreActions = _portfolioStoreActions;
    
    return {
      getInstance: function getInstance(_id) {
        if (typeof instances[_id] !== 'undefined') {
          return instances[_id];
        } else if (typeof _id !== 'undefined') {
          instances[_id] = new portfolioVMService(_id);
          return instances[_id];
        }
      },
      removeInstance: function removeInstance(_id) {
        delete instances[_id];
      }
    }
  };
});
