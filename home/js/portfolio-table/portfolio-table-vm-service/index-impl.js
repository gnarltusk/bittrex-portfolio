define([
  'lodash',
], function(_) {
  'use strict';
  var storeService;
  var portfolioTableVMService = function portfolioTableVMService(id) {
    this.id = id;
    this.storeCallback = null;
    this.titles = [
      {
        name: 'currency',
        label: 'Currency'
      },
      {
        name: 'balance',
        label: 'Balance'
      },
      {
        name: 'btcValue',
        label: 'BTC Value'
      },
      {
        name: 'usdValue',
        label: 'USD Value'
      },
      {
        name: 'averageProfit',
        label: '+/- %'
      }
    ];
    this.tableData = [];
  };

  portfolioTableVMService.prototype.init = function init() {
    var _this = this;
    this.storeCallback = storeService.onUpdate(function(data){
      _this.onUpdate(data);
    })
  };
  portfolioTableVMService.prototype.onUpdate = function onUpdate(storeData) {
    this.tableData = [];
    var balances = _.cloneDeep(storeData.portfolioStore[this.id].balances);
    for(var coin in balances) {
      var wallet = balances[coin];
      wallet.currency = coin;
      this.tableData.push(wallet);
    }
  };
  return function Factory(_storeService) {
    var instances = {};
    storeService = _storeService;
    
    return {
      getInstance: function getInstance(_id) {
        if (typeof instances[_id] !== 'undefined') {
          return instances[_id];
        } else if (typeof _id !== 'undefined') {
          instances[_id] = new portfolioTableVMService(_id);
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
