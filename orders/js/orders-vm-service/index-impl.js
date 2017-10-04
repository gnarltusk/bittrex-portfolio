define([
  'lodash',
], function(_) {
  'use strict';
  var bittrexCrudService;
  var ordersStoreActions;
  var ordersVMService = 
  function ordersVMService(id) {
    this.id = id;
  };

  ordersVMService.prototype.init = function init() {
    var _this = this;
    ordersStoreActions.initStore();
    bittrexCrudService.getOrders()
    .then(function(data){
      ordersStoreActions.updateOrders(_this.id, data)
    });
  };

  return function Factory(_bittrexCrudService, _ordersStoreActions) {
    var instances = {};
    bittrexCrudService = _bittrexCrudService;
    ordersStoreActions = _ordersStoreActions;
    
    return {
      getInstance: function getInstance(_id) {
        if (typeof instances[_id] !== 'undefined') {
          return instances[_id];
        } else if (typeof _id !== 'undefined') {
          instances[_id] = new ordersVMService(_id);
          return instances[_id];
        }
      },
      removeInstance: function removeInstance(_id) {
        delete instances[_id];
      }
    }
  };
});
