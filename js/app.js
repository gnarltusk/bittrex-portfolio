define([
  'angular-couch-potato',
  'angular-ui-router',
  'angular-css-injector',
  'angular-ui'
], function(couchPotato) {
  var app = angular.module('game-server',
    ['ui.router',
      'scs.couch-potato',
      'angular.css.injector',
      'ui.bootstrap']);
  couchPotato.configureApp(app);

  return app;
});
