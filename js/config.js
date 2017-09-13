require.config({
  paths: {
    'angular': 'vendors/angular/angular.min',
    'angular-ui-router': 'vendors/angular/angular-ui-router.min',
    'angular-couch-potato': 'vendors/angular/angular-couch-potato',
    'angular-css-injector': 'vendors/angular/angular-css-injector.min',
    'angular-ui': '/node_modules/angular1-ui-bootstrap4/dist/ui-bootstrap-tpls',
    'jquery': 'https://code.jquery.com/jquery-3.2.1.slim.min',
    'popper': 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min',
    'bootstrapjs': 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min',
    'redux': 'vendors/redux/redux.min',
    'lodash': 'vendors/lodash/lodash.min',
    'states': 'states',
    'app': 'app',
    'app-init': 'app-init',
    'text': 'vendors/requirejs-text/2.0.14/text',
    'socket-io': '/socket.io/socket.io',
    'preloadjs': 'vendors/createjs/preloadjs/0.6.1/preloadjs-0.6.1.min',
    'soundjs': 'vendors/createjs/soundjs/0.6.1/soundjs-0.6.1.min',
    'numeral': 'vendors/numeral/numeral.min'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'app': {
      deps: ['angular']
    },
    'app-init': {
      deps: ['angular', 'app']
    },
    'jquery': {
      exports: 'jquery'
    },
    'popper': {
      deps : ['jquery'],
      exports: 'Popper'
    },
    'bootstrapjs' : {
      deps : ['jquery','popper'],
    }
  }
});

require(['app-init', 'popper'], function(appInit, Popper) {
  window.Popper = Popper;
  require(['bootstrapjs'], function(){
    appInit();
  })
});