define([
  'app',
  'text!/home/js/portfolio-balance/index.html',
  'text!/home/js/portfolio-balance/index.css',
  './portfolio-balance-vm-service/index.js',
  'js/store-service/0.1/index.js',
],
function(app, html, css) {

  app.registerDirective('portfolioBalance', [function() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'PortfolioBalanceController',
      controllerAs: 'PortfolioBalanceCtrl',
      template: function() {
        return html + '<style>' + css + '</style>';
      }
    };
  }]);

  app.registerController('PortfolioBalanceController', 
  ['$scope', 'cssInjector', 'portfolioBalanceVMService', 'storeService',
    function($scope, cssInjector, portfolioBalanceVMService, storeService) {
      var _this = this;
      var ctx = document.getElementById('balance-chart').getContext('2d');
      this.portfolioBalanceVM = portfolioBalanceVMService.getInstance('default');
      this.portfolioBalanceVM.init(ctx);
      $scope.$on('$destroy', function(){
        _this.portfolioBalanceVM.storeCallback();
      })
    }]);
});
