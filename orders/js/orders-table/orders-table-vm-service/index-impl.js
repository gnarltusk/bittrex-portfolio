define([
  'lodash',
], function(_) {
  'use strict';
  var storeService;
  var ordersTableVMService = function ordersTableVMService(id) {
    this.id = id;
    this.storeCallback = null;
    this.titles = [
      {
        name: 'exchange',
        label: 'Exchange'
      },
      {
        name: 'quantity',
        label: 'Quantity'
      },
      {
        name: 'limit',
        label: 'Limit'
      },
      {
        name: 'goalChange',
        label: '% to Goal'
      }
    ];
    this.tableData = [];
  };

  ordersTableVMService.prototype.init = function init(ctx) {
    var _this = this;
    this.storeCallback = storeService.onUpdate(function(data){
      _this.onUpdate(data);
    }.bind(this))
  };

  ordersTableVMService.prototype.onUpdate = function onUpdate(storeData) {    
    this.tableData = storeData.ordersStore.orders;
  };

  return function Factory(_storeService) {
    var instances = {};
    storeService = _storeService;
    
    return {
      getInstance: function getInstance(_id) {
        if (typeof instances[_id] !== 'undefined') {
          return instances[_id];
        } else if (typeof _id !== 'undefined') {
          instances[_id] = new ordersTableVMService(_id);
          return instances[_id];
        }
      },
      removeInstance: function removeInstance(_id) {
        instances[_id].storeCallback();
        delete instances[_id];
      }
    }
  };
});
