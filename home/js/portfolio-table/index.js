define([
  'app',
  'text!/home/js/portfolio-table/index.html',
  'text!/home/js/portfolio-table/index.css',
  './portfolio-table-vm-service/index.js',
  'js/store-service/0.1/index.js'
],
function(app, html, css) {

  app.registerDirective('portfolioTable', [function() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'PortfolioTableController',
      controllerAs: 'PortfolioTableCtrl',
      template: function() {
        return html + '<style>' + css + '</style>';
      }
    };
  }]);

  app.registerController('PortfolioTableController', 
  ['$scope', 'cssInjector', 'portfolioTableVMService', 'storeService',
    function($scope, cssInjector, portfolioTableVMService, storeService) {
      var _this = this;
      var updateStoreData = function updateStoreData(storeData) {
        _this.tableData = portfolioTableVMService.formatTableData(storeData);
        console.log(_this.tableData);
      };
      storeService.onUpdate(updateStoreData, $scope);
    }]);
});
