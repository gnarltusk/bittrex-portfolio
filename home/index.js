define([
  'app',
  'js/bittrex-crud-service/0.1/index.js',
  'js/portfolio-nav/index.js',
  'home/js/portfolio-table/index.js',
  'home/js/portfolio-balance/index.js',
  'home/js/portfolio-vm-service/index.js'
],
function(app) {
  app.registerController('HomeController', 
  ['$scope', 'cssInjector', 'bittrexCrudService', 'portfolioVMService',
    function($scope, cssInjector, bittrexCrudService, portfolioVMService) {
      cssInjector.add('home/index.css');
      this.portfolioVM = portfolioVMService.getInstance('default');
      this.portfolioVM.init();
    }]);
});
