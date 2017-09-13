define([
  'app',
  './index-impl.js',
  'js/bittrex-crud-service/0.1/index.js',  
  'orders/js/orders-store-actions/0.1/index.js',  
], function(app, socketServiceImpl) {
  app.registerFactory('ordersVMService', [
    'bittrexCrudService',
    'ordersStoreActions',
    socketServiceImpl
  ]);
});
