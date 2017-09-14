define([/* eslint-disable */
  'app',
  'js/compile-service/0.1/index-impl.js'
  /* eslint-enable */
], function(app, compileServiceImpl) {
  'use strict';

  app.registerFactory('compileService', [
    '$compile',
    compileServiceImpl
  ]);
});
