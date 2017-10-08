define([
  'lodash',
], function(_) {
  'use strict';
  var bittrexCrudService;
  var sellCalculatorStoreActions;
  var storeService;
  var $q;

  var sellCalculatorVMService = function sellCalculatorVMService(id) {
    var _this = this;
    this.id = id;
    this.storeCallback;
    this.btcValue = 0;
    this.walletBTC = 0;
    this.capital = 0;
    this.wallet = 0;
    this.units = 0;
    this.risk = 0;
    this.riskPct = 0;
    this.marketPrice = 0;
    this.market = '';
    this.entry = 0;
    this.target = 0;
    this.targetPct = 0;
    this.stop = 0;
    this.stopPct = 0;
  };
  
  sellCalculatorVMService.prototype.init = function init() {
    var _this = this;
    this.storeCallback = storeService.onUpdate(this.onUpdate.bind(this))
    sellCalculatorStoreActions.initStore(_this.id);
    this.loadCalculator()
    .then(function() {
      _this.loadBTCBalance();      
    });
  };

  sellCalculatorVMService.prototype.onUpdate = function onUpdate(data) {
    var calculatorData = data.sellCalculatorStore[this.id];
    this.btcValue = calculatorData.btcValue;
    this.capital = calculatorData.capital;
    this.wallet = calculatorData.wallet;
    this.risk = calculatorData.risk;
    this.riskPct = calculatorData.riskPct;
    this.units = calculatorData.units;
    this.marketPrice = calculatorData.marketPrice;
    this.market = calculatorData.market;
    this.entry = calculatorData.entry;
    this.target = calculatorData.target;
    this.targetPct = calculatorData.targetPct;
    this.stop = calculatorData.stop;
    this.stopPct = calculatorData.stopPct;
  };
  sellCalculatorVMService.prototype.updateCalculator = function updateCalculator(_type) {
    var type = _type || '';
    if (type === 'value') {
      this.calculateTargetStop();
    } else if(type === 'pct') {
      this.calculateTargetStopPct();
    }
    var stopChange = this.stop - this.entry;
    this.units = this.risk / (-1 * stopChange);
    var calculator = {
      btcValue: this.btcValue,
      capital: this.capital,
      wallet: this.wallet,
      risk: this.risk,
      riskPct: this.riskPct,
      market: this.market,
      marketPrice: this.marketPrice,
      units: this.units,
      entry: this.entry,
      target: this.target,
      targetPct: this.targetPct,
      stop: this.stop,
      stopPct: this.stopPct,
      walletBTC: this.walletBTC
    }
    sellCalculatorStoreActions.updateCalculator(this.id, calculator);    
  }
  
  sellCalculatorVMService.prototype.calculateTargetStopPct = function calculateStuff() {
    var _this = this;
    _this.targetPct = Math.round(((_this.target - _this.entry)/_this.target) * 10000)/100;
    _this.stopPct = -1 * Math.round(((_this.entry - _this.stop)/_this.entry) * 10000)/100;
    _this.riskPct = Math.round(((_this.risk)/_this.capital) * 10000)/100;
  };
  sellCalculatorVMService.prototype.calculateTargetStop = function calculateOtherStuff() {
    var _this = this;
    _this.risk = (_this.capital * _this.riskPct/100);
    _this.target = (_this.entry * _this.targetPct/100) + _this.entry;
    _this.stop = ((_this.entry * (-1 * _this.stopPct/100)) - _this.entry) * -1;
    _this.risk = Math.round(_this.risk*100000000)/100000000;
    _this.target = Math.round(_this.target*100000000)/100000000;
    _this.stop = Math.round(_this.stop*100000000)/100000000;
  };

  sellCalculatorVMService.prototype.loadCalculator = function loadCalculator() {
    var _this = this;
    return bittrexCrudService.getMarket('BTC')
    .then(function(data){
      _this.btcValue = data.BTC.USD.PRICE;
      _this.updateCalculator();
    });
  };
  sellCalculatorVMService.prototype.loadBTCBalance = function loadBTCBalance() {
    var _this = this;
    return bittrexCrudService.getBalances()
    .then(function(data){
      _this.wallet = parseFloat(data.BTC.balance);
      _this.updateCalculator('value');      
    })
  };
  sellCalculatorVMService.prototype.searchMarket = function() {
    var _this = this;
    bittrexCrudService.getMarket(_this.market)
    .then(function(data) {
      _this.marketPrice = data[_this.market].BTC.PRICE;
      _this.updateCalculator();
    });
  };
  sellCalculatorVMService.prototype.useWalletValue = function() {
    var _this = this;
    _this.capital = _this.wallet;
    _this.updateCalculator('value');
  };
  sellCalculatorVMService.prototype.useMarketValue = function() {
    var _this = this;
    _this.entry = Number(_this.marketPrice);
    _this.updateCalculator('value');
  };
  return function Factory(_bittrexCrudService, _sellCalculatorStoreActions, _storeService,_$q) {
    var instances = {};
    bittrexCrudService = _bittrexCrudService;
    sellCalculatorStoreActions = _sellCalculatorStoreActions;
    storeService = _storeService;
    $q = _$q;

    return {
      getInstance: function getInstance(_id) {
        if (typeof instances[_id] !== 'undefined') {
          return instances[_id];
        } else if (typeof _id !== 'undefined') {
          instances[_id] = new sellCalculatorVMService(_id);
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
