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
    var dirty = false;
    var initial = {};
    /**
     * Add a callback when the data is updated.
     * @function onUpdate
     * @param {Function} _next
     * @returns {Object}
     * */
    var onUpdate = function onUpdate(_next) {
      return cbService.register('StoreData', _next);
    };

    /**
     * Gets clone of data.
     * @function getStoreData
     * @returns {Object}
     * */
    var getStoreData = function getStoreData() {
      return _.cloneDeep(storeData);
    };

    /**
     * Updates the workspace data. Sets initial data state if needed.
     * @function updateStoreData
     * @param {Object} data
     * */
    var updateStoreData = function updateStoreData(data) {
      if (_.isEmpty(initial)) {
        initial = data;
      }
      storeData = data;
      dirty = !_.isEqual(initial,storeData);
      this.cbService.next('StoreData', this.getStoreData());
    };

    /**
     * Sets the initial data set to the current.
     * @function updateInitialState
     * */
    var updateInitialState = function updateInitialState() {
      initial = storeData;
      dirty = false;
    };

    return {
      dirty: dirty,
      onUpdate: onUpdate,
      getStoreData: getStoreData,
      updateStoreData: updateStoreData,
      updateInitialState: updateInitialState
    };
  };

  return StoreService;
});
