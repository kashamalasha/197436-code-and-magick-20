'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 3000;

  var removeChildren = function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  var debounce = function (callback) {
    var lastTimeout = null;
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, arguments);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.domUtil = {
    removeChildren: removeChildren,
    debounce: debounce
  };

})();
