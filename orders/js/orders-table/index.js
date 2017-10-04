define([
  'app',
  'text!/orders/js/orders-table/index.html',
  'text!/orders/js/orders-table/index.css',
  './orders-table-vm-service/index.js',
  'js/store-service/0.1/index.js'
],
function(app, html, css) {

  app.registerDirective('ordersTable', [function() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'OrdersTableController',
      controllerAs: 'OrdersTableCtrl',
      template: function() {
        return html + '<style>' + css + '</style>';
      }
    };
  }]);

  app.registerController('OrdersTableController', 
  ['$scope', 'cssInjector', 'ordersTableVMService', 'storeService',
    function($scope, cssInjector, ordersTableVMService, storeService) {
      var _this = this;
      this.ordersTableVM = ordersTableVMService.getInstance('default');
      this.ordersTableVM.init();
      $scope.$on('$destroy', function(){
        _this.ordersTableVM.storeCallback();
      })
    }]);
});
