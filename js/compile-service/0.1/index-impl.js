/**
 * compile-service AMD module that returns compileServiceFactory implementation.
 * Service that compiles html and stylesheets in directives,
 * handles translusion element.
 *
 * @summary Service that compiles html and stylesheets.
 * @version 0.1
 * @since 0.1
 * @author Chul Kim <chul.kim@aofl.com>
 * @module core_client_library/js/aofl-js/0-6-0/compile-service/0-1
 */
define(function() {
  'use strict';

  /**
   * compileServiceFactory factory receives angularjs $compile object
   * and returns service.
   * @function compileServiceFactory
   * @param {Object} $compile - angularjs $compile object
   * @return {Object}
   */

  return function compileServiceFactory($compile) {
    /**
     * @typedef {Object} cssHashes - object that holds css hashes
     */
    var cssHashes = {};

    /**
     * Makes hash from string
     * @function hashStr
     * @param {String} str - string to make hash from
     * @return {Number}
     */
    function hashStr(str) {
      var hash = 0;
      if (str.length == 0)
        return hash;
      for (var char, i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash &= hash;
      }
      return hash;
    }

    /**
     * Removes css stylesheet if its cssHash <= 0
     * @function removeStylesheetIfUnused
     * @param {Number} cssHash
     */
    function removeStylesheetIfUnused(cssHash) {
      if (cssHashes[cssHash] > 0) {
        cssHashes[cssHash]--;
        if (cssHashes[cssHash] <= 0) {
          angular.element(document.getElementById(cssHash)).remove();
        }
      }
    }

    /**
     * Generates cssHash, appends css stylesheet to document's head element,
     * removes unused stylesheet
     * @function insertStylesheet
     * @param {String} css - css file which will be compiled
     * @param {Object} scope - scope object
     * @param {Object} parentElem - parent of html element, which css and html is compilng
     */
    function insertStylesheet(css, scope, parentElem) {
      var cssHash = hashStr(css);
      var useCount = cssHashes[cssHash];
      var removeOnScopeDestroy = angular.noop;

      if (typeof useCount !== 'number') {
        useCount = cssHashes[cssHash] = 0;
      }

      if (useCount === 0) {
        var stylesheet = angular.element('<style></style>');
        stylesheet.text(css);
        stylesheet.attr('id', cssHash);
        // $compile(stylesheet)(scope);
        angular.element(document.head).append(stylesheet);
      } else {
        // console.log('CSS is already present in DOM.');
      }

      /**
       * Cleans up event binding on scope destroy
       * @function onScopeDestroy
       */
      function onScopeDestroy() {
        removeStylesheetIfUnused(cssHash);
        removeOnScopeDestroy();
        parentElem.off('$destroy', onElementDestroy);
      }

      /**
       * Removes unused stylesheet, cleans event binding
       * @function onElementDestroy
       */
      function onElementDestroy() {
        removeStylesheetIfUnused(cssHash);
        removeOnScopeDestroy();
      }

      removeOnScopeDestroy = scope.$on('$destroy', onScopeDestroy);
      parentElem.one('$destroy', onElementDestroy);
      cssHashes[cssHash]++;
    }

    /**
     * Compiles contents(html and css) handles appending of
     * transclusion element if it presents.
     * @function compile
     * @param {Object} content
     * @param {Object} scope
     * @param {Object} parentElem
     * @param {Function} transcludeFn
     * @param {Object} transclusionScopeAdditions
     */
    function compile(content, scope, parentElem, transcludeFn, transclusionScopeAdditions) {
      if (typeof content !== 'object' || !(content.html || content.css)) {
        throw new Error('1st argument must be an object with at least one of ' +
          'properties `html` and `css`.');
      }
      if (typeof scope !== 'object' || typeof scope.$root === 'undefined') {
        throw new Error('2nd argument must be an angular scope');
      }
      if (!(parentElem instanceof angular.element)) {
        throw new Error('3rd argument must be an instance of angular.element');
      }

      if (content.html) {
        var contents = angular.element(content.html);
        var transclusionParent = contents[0].querySelector('[ng-transclude]');

        if (transclusionParent) {
          transclusionParent.removeAttribute('ng-transclude');
        }

        $compile(contents)(scope);
        parentElem.append(contents);

        if (transclusionParent && transcludeFn) {
          transcludeFn(function(clone, tScope) {
            angular.element(transclusionParent).append(clone);
            if (typeof transclusionScopeAdditions === 'object') {
              angular.extend(tScope, transclusionScopeAdditions);
            }
          });
        }
      }

      if (content.css) {
        if (Array.isArray(content.css)) {
          content.css.forEach(function (css) {
            insertStylesheet(css, scope, parentElem);
          });
        } else {
          insertStylesheet(content.css, scope, parentElem);
        }
      }
    }

    return {
      compile: compile
    };
  };
});
