define([
  'app',
  './index-impl.js',
  'js/bittrex-crud-service/0.1/index.js',  
  'sell-calculator/js/sell-calculator-store-actions/0.1/index.js',  
], function(app, socketServiceImpl) {
  app.registerFactory('sellCalculatorVMService', [
    'bittrexCrudService',
    'sellCalculatorStoreActions',
    'storeService',
    socketServiceImpl
  ]);
});
