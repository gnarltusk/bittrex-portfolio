define([
  'app',
  'js/bittrex-crud-service/0.1/index.js',
  'js/portfolio-nav/index.js',  
  'sell-calculator/js/sell-calculator-vm-service/index.js'
],
function(app) {
  app.registerController('SellCalculatorController', 
  ['$scope', 'cssInjector', 'bittrexCrudService', 'sellCalculatorVMService',
    function($scope, cssInjector, bittrexCrudService, sellCalculatorVMService) {
      cssInjector.add('sell-calculator/index.css');
      var _this = this;
      this.sellCalculatorVM = sellCalculatorVMService.getInstance('default');
      this.sellCalculatorVM.init();
      $scope.$on('$destroy',function(){
        _this.sellCalculatorVM.storeCallback();
      })
    }]);
});
