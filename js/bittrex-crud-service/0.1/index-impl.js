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
      return _get('/User/GetBalances', params)
    };

    return {
      getBalances: getBalances
    };
  };

  return BittrexCrudServiceImpl;
});
