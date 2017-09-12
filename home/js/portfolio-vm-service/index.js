define([
  'app',
  './index-impl.js',
  'js/bittrex-crud-service/0.1/index.js',  
  'home/js/portfolio-store-actions/0.1/index.js',  
], function(app, socketServiceImpl) {
  app.registerFactory('portfolioVMService', [
    'bittrexCrudService',
    'portfolioStoreActions',
    socketServiceImpl
  ]);
});
