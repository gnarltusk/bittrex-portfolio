define([
  'app',
  'js/bittrex-crud-service/0.1/index.js',
  'home/js/portfolio-table/index.js',
  'home/js/portfolio-balance/index.js',
  'home/js/portfolio-vm-service/index.js'
],
function(app) {
  app.registerController('HomeController', 
  ['$scope', 'cssInjector', 'bittrexCrudService', 'portfolioVMService',
    function($scope, cssInjector, bittrexCrudService, portfolioVMService) {
      cssInjector.add('home/index.css');
      cssInjector.add('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css');
      portfolioVMService.init();
    }]);
});
