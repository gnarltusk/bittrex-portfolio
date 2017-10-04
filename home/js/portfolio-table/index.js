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
      bindToController: true,
      controller: 'PortfolioTableController',
      controllerAs: 'PortfolioTableCtrl',
      template: function() {
        return html + '<style>' + css + '</style>';
      }
    };
  }]);

  app.registerController('PortfolioTableController', 
  ['$scope', 'portfolioTableVMService', 'storeService',
    function($scope, portfolioTableVMService, storeService) {
      var _this = this;
      this.portfolioTableVM = portfolioTableVMService.getInstance('default');
      this.portfolioTableVM.init();
      $scope.$on('$destroy', function(){
        _this.portfolioTableVM.storeCallback();
      })
    }]);
});
