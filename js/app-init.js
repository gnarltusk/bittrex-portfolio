define(['app', 'states'], function(app, states) {
  var appInit = function() {
    var stateProvider;
    var couchPotatoProvider;
    app.config(['$stateProvider', '$couchPotatoProvider',
      '$sceDelegateProvider', '$locationProvider', '$urlRouterProvider',
      function($stateProvider, $couchPotatoProvider,
        $sceDelegateProvider, $locationProvider, $urlRouterProvider) {
        stateProvider = $stateProvider;
        couchPotatoProvider = $couchPotatoProvider;
        $urlRouterProvider.otherwise('/');
      }]);

  app.run(['$couchPotato', '$state', '$stateParams', '$rootScope',
    function($couchPotato, $state, $stateParams, $rootScope) {
      app.lazy = $couchPotato;
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      stateProvider.state('home', {
        url: '/',
        templateUrl: 'home/index.html',
        resolve: {
          loadStateCtrl: couchPotatoProvider
        .resolveDependencies(['home/index.js'])
        },
        controller: 'HomeController as HomeCtrl'
      });

			for(var key in states) {
				var state = states[key];
				stateProvider.state(key, {
          url: state.url,
					templateUrl: state.path + '/index.html',
					resolve:{
						loadStateCtrl: couchPotatoProvider
						.resolveDependencies([state.path + '/index.js']),
					},
					controller: state.controller,
				});
      }
    }]);

    var bootstrapApplication = (function() {
      angular.element(document)
        .ready(function() {
        angular.bootstrap(document,
          [app.name, function() {
            angular.element(document)
            .find('html')
            .addClass('ng-app');
          }]);
        });
    });
    bootstrapApplication();
  };
  return appInit;
});
