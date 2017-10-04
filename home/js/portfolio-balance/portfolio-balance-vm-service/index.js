define([
  'app',
  './index-impl.js',
], function(app, socketServiceImpl) {
  app.registerFactory('portfolioBalanceVMService', [
    'storeService',
    socketServiceImpl
  ]);
});
