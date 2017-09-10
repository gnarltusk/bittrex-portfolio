define([
  'app',
  'js/bittrex-crud-service/0.1/index-impl.js',
], function(app, BittrexCrudServiceImpl) {
  app.registerService('bittrexCrudService', [
    '$http', '$q', BittrexCrudServiceImpl]);
});
