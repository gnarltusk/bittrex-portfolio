define([
  'app',
  'text!/home/js/portfolio-balance/index.html',
  'text!/home/js/portfolio-balance/index.css',
  'https://www.gstatic.com/charts/loader.js',
  './portfolio-balance-vm-service/index.js',
  'js/store-service/0.1/index.js',
],
function(app, html, css) {

  app.registerDirective('portfolioBalance', [function() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'PortfolioBalanceController',
      controllerAs: 'PortfolioBalanceCtrl',
      template: function() {
        return html + '<style>' + css + '</style>';
      }
    };
  }]);

  app.registerController('PortfolioBalanceController', 
  ['$scope', 'cssInjector', 'portfolioBalanceVMService', 'storeService',
    function($scope, cssInjector, portfolioBalanceVMService, storeService) {
      var _this = this;
      var updateStoreData = function updateStoreData(storeData) {
        _this.balanceData = portfolioBalanceVMService.formatBalanceData(storeData);
      };
      storeService.onUpdate(updateStoreData);
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('balance-chart'));

        chart.draw(data, options);
      }
    }]);
});
