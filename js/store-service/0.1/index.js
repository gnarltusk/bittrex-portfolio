define([
  'app',
  'js/store-service/0.1/index-impl.js',
  'js/register-callback-service/0.1/index.js'
], function(app, StoreServiceImpl) {
  app.registerService('storeService', ['registerCallbackService', StoreServiceImpl]);
});
