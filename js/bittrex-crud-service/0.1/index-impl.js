define([
  'lodash'
], function(_) {
  'use strict';
  /**
   * BittrexCrudService
   * @function BittrexCrudService
   * @param {Object} registerCallbackService
   * @returns {Object}
   * */
  var BittrexCrudServiceImpl =
  function BittrexCrudServiceImpl($http, $q) {
    var _get = function _get(url, data, config) {
      var deferred = $q.defer();
      $http.post(url, data, config)
      .then(function(res){
        deferred.resolve(res.data);
      });
      return deferred.promise;
    };
    
    var getBalances = function getBalances(params) {
      return _get('/Bittrex/GetBalances', params)
    };
    var getOrders = function getOrders(params) {
      return _get('/Bittrex/GetOrders', params)
    };
    var getMarket = function getMarket(market) {
      var params = {
        market: market
      }
      return _get('/Bittrex/GetMarket', params)
    };
    return {
      getBalances: getBalances,
      getOrders: getOrders,
      getMarket: getMarket
    };
  };

  return BittrexCrudServiceImpl;
});
