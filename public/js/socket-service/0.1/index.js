define([
  'app',
  'js/socket-service/0.1/index-impl.js',
], function(app, socketServiceImpl) {
  app.registerFactory('socketService', ['$rootScope', socketServiceImpl]);
});
