define([
  'app',
  'text!portfolio-nav/index.html',
  'text!portfolio-nav/index.css',
],
function(app, html, css) {

  app.registerDirective('portfolioNav', [function() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'PortfolioNavController',
      controllerAs: 'PortfolioNavCtrl',
      template: function() {
        return html + '<style>' + css + '</style>';
      }
    };
  }]);

  app.registerController('PortfolioNavController', 
  ['$scope', 'cssInjector',
    function($scope, cssInjector) {
      var _this = this;

    }]);
});
