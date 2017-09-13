define([
  'app',
  './index-impl.js',
], function(app, socketServiceImpl) {
  app.registerFactory('ordersTableVMService', [
    socketServiceImpl
  ]);
});
