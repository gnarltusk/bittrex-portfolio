define([
  'lodash',
], function(_) {
  'use strict';
  var bittrexCrudService;
  var sellCalculatorStoreActions;
  var storeService;
  var sellCalculatorVMService = function sellCalculatorVMService(id) {
    var _this = this;
    this.id = id;
    this.storeCallback;
    this.btcValue = 0;
    this.walletBTC = 0;
    this.capital = 0;
    this.risk = 0;
    this.allocation = 0;
    this.marketPrice = 0;
    this.market = '';
    this.entry = 0;
    this.target = 0;
    this.targetPct = 0;
    this.stop = 0;
    this.stopPct = 0;

    sellCalculatorStoreActions.initStore(_this.id);
  };
  sellCalculatorVMService.prototype.init = function init() {
    this.loadCalculator();
    this.storeCallback = storeService.onUpdate(this.onUpdate.bind(this))
  };

  sellCalculatorVMService.prototype.onUpdate = function onUpdate(data) {
    var calculatorData = data.sellCalculatorStore[this.id];
    this.btcValue = calculatorData.btcValue;
    this.capital = calculatorData.capital;
    this.risk = calculatorData.risk;
    this.allocation = calculatorData.allocation;
    this.marketPrice = calculatorData.marketPrice;
    this.market = calculatorData.market;
    this.entry = calculatorData.entry;
    this.target = calculatorData.target;
    this.targetPct = calculatorData.targetPct;
    this.stop = calculatorData.stop;
    this.stopPct = calculatorData.stopPct;
  };
  // sellCalculatorVMService.prototype.updateCapitalInput = function updateCapitalInput(text) {
  //   var _this = this;
  //   sellCalculatorStoreActions.updateCapital(_this.id, _this.capital);    
  // };
  sellCalculatorVMService.prototype.updateCapitalInput = function updateCapitalInput() {
    var _this = this;
    sellCalculatorStoreActions.updateCapital(_this.id, _this.capital);    
  };
  sellCalculatorVMService.prototype.updateRiskInput = function updateRiskInput() {
    var _this = this;
  };
  sellCalculatorVMService.prototype.updateAllocationInput = function updateAllocationInput() {
    var _this = this;
  };
  sellCalculatorVMService.prototype.updateMarketInput = function updateMarketInput() {
    var _this = this;
  };
  sellCalculatorVMService.prototype.updateEntryInput = function updateEntryInput() {
    var _this = this;
    _this.calculateStuff();
  };
  sellCalculatorVMService.prototype.updateTargetInput = function updateTargetInput() {
    var _this = this;
    _this.calculateStuff();
    
  };
  sellCalculatorVMService.prototype.updateTargetPctInput = function updateTargetPctInput() {
    var _this = this;
    _this.calculateOtherStuff();
  };
  sellCalculatorVMService.prototype.updateStopInput = function updateStopInput() {
    var _this = this;
    _this.calculateStuff();
    
  };
  sellCalculatorVMService.prototype.updateStopPctInput = function updateRiskInput() {
    var _this = this;
    _this.calculateOtherStuff();
  };
  sellCalculatorVMService.prototype.calculateStuff = function calculateStuff() {
    var _this = this;
    _this.targetPct = Math.round(((_this.target - _this.entry)/_this.target) * 10000)/100;
    _this.stopPct = -1 * Math.round(((_this.entry - _this.stop)/_this.entry) * 10000)/100;
  };
  sellCalculatorVMService.prototype.calculateOtherStuff = function calculateOtherStuff() {
    var _this = this;
    _this.target = (_this.entry * _this.targetPct/100) + _this.entry;
    _this.stop = ((_this.entry * (-1 * _this.stopPct/100)) - _this.entry) * -1;
    _this.target = Math.round(_this.target*100000000)/100000000;
    _this.stop = Math.round(_this.stop*100000000)/100000000;
  };

  sellCalculatorVMService.prototype.loadCalculator = function loadCalculator() {
    var _this = this;
    bittrexCrudService.getMarket('USDT-BTC')
    .then(function(data){
      sellCalculatorStoreActions.loadCalculator(_this.id, data.Last);
    });
  };

  return function Factory(_bittrexCrudService, _sellCalculatorStoreActions, _storeService) {
    var instances = {};
    bittrexCrudService = _bittrexCrudService;
    sellCalculatorStoreActions = _sellCalculatorStoreActions;
    storeService = _storeService;
    
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
