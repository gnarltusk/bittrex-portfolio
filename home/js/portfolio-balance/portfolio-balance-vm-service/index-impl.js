define([
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js'
], function() {
  'use strict';
  var storeService;
  var portfolioBalanceVMService = function portfolioBalanceVMService(id) {
    this.id = id;
    this.totalBTC = 0;
    this.totalUSD = 0;
    this.storeCallback = null;
    this.ctx = null;
    this.chartData = {
      type: "doughnut",
      data: {
        labels: ['a','b','c'],
        datasets: [
          {
            data: [12,12,12,12],
            backgroundColor: [
              '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'
            ]
          }
        ]
      }
    }
  };
  
  portfolioBalanceVMService.prototype.init = function init(ctx) {
    this.ctx = ctx
    var _this = this;
    this.storeCallback = storeService.onUpdate(function(data){
      _this.onUpdate(data);
    }.bind(this))
  };

  portfolioBalanceVMService.prototype.onUpdate = function onUpdate(storeData) {
    var balances = storeData.portfolioStore[this.id].balances;
    var labels = Object.keys(balances);
    var btcValue = [];
    this.totalBTC = 0;
    this.totalUSD = 0;
    for(var i in balances) {
      var wallet = balances[i];
      this.totalBTC += parseFloat(wallet.btcValue);
      this.totalUSD += parseFloat(wallet.usdValue);
    }
    this.totalBTC = '฿' + Math.round(this.totalBTC*100000000)/100000000;
    this.totalUSD = '$' + Math.round(this.totalUSD*100)/100;
    var btcValue = Object.values(balances).map(function(wallet){
      return wallet.btcValue;
    });
    this.chartData = {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: btcValue,
            backgroundColor: [
              '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'
            ]
          }
        ]
      }
    }
    new Chart(this.ctx, this.chartData);
  };

  return function Factory(_storeService) {
    var instances = {};
    storeService = _storeService;
    
    return {
      getInstance: function getInstance(_id) {
        if (typeof instances[_id] !== 'undefined') {
          return instances[_id];
        } else if (typeof _id !== 'undefined') {
          instances[_id] = new portfolioBalanceVMService(_id);
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
