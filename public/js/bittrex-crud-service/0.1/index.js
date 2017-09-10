define([
  'app',
  'js/bittrex-crud-service/0.1/index-impl.js',
  'js/register-callback-service/0.1/index.js',
  'js/socket-service/0.1/index.js'
], function(app, BittrexCrudServiceImpl) {
  app.registerService('bittrexCrudService', [
    'registerCallbackService', 'socketService', BittrexCrudServiceImpl]);
});
