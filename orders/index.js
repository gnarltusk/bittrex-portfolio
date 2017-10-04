define([
  'app',
  'js/bittrex-crud-service/0.1/index.js',
  'js/portfolio-nav/index.js',  
  'orders/js/orders-vm-service/index.js',
  'orders/js/orders-table/index.js',
],
function(app) {
  app.registerController('OrdersController', 
  ['$scope', 'cssInjector', 'bittrexCrudService', 'ordersVMService',
    function($scope, cssInjector, bittrexCrudService, ordersVMService) {
      cssInjector.add('orders/index.css');
      this.ordersVM = ordersVMService.getInstance('default');
      this.ordersVM.init();
    }]);
});
