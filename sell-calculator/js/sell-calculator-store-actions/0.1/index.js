define([
  'app',
  './index-impl.js',
  'js/store-service/0.1/index.js'
], function(app, StoreServiceImpl) {
  app.registerService('sellCalculatorStoreActions', ['storeService', StoreServiceImpl]);
});
