define([
  'app',
  'js/bittrex-crud-service/0.1/index.js',
  'js/socket-service/0.1/index.js'
],
function(app) {
  app.registerController('HomeController', 
  ['$scope', 'cssInjector', 'bittrexCrudService', 'socketService',
    function($scope, cssInjector, bittrexCrudService, socketService) {
      cssInjector.add('home/index.css');
      cssInjector.add('js/vendors/bootstrap/4.0.0/css/bootstrap.min.css');
      socketService.on('marketsUpdated',function(data){
        console.log(data);
      })
      bittrexCrudService.getBalances()
      .then(function(data){
        console.log(data);
      });
    }]);
});
