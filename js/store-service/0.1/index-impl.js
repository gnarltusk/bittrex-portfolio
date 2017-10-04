define([
  'lodash'
], function(_) {
  'use strict';
  /**
   * StoreService
   * @function StoreService
   * @param {Object} registerCallbackService
   * @returns {Object}
   * */
  var StoreService = function StoreService(_registerCallbackService) {
    var registerCallbackService = _registerCallbackService;
    var cbService = registerCallbackService.newInstance();
    var storeData = {};
    /**
     * Add a callback when the data is updated.
     * @function onUpdate
     * @param {Function} _next
     * @returns {Object}
     * */
    var onUpdate = function onUpdate(_next) {
      var callback = cbService.register('StoreData', _next);
      return callback;    
    };

    /**
     * Gets clone of data.
     * @function getStoreData
     * @returns {Object}
     * */
    var getStoreData = function getStoreData() {
      return storeData;
    };

    /**
     * Updates the workspace data. Sets initial data state if needed.
     * @function updateStoreData
     * @param {Object} data
     * */
    var updateStoreData = function updateStoreData(data) {
      storeData = data;
      cbService.next('StoreData', this.getStoreData());
    };

    return {
      onUpdate: onUpdate,
      getStoreData: getStoreData,
      updateStoreData: updateStoreData,
    };
  };

  return StoreService;
});
