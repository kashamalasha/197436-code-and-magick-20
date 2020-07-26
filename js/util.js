'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 3000;

  var Key = {
    ENTER: {
      keyCode: 13,
      keyName: 'Enter'
    },
    ESCAPE: {
      keyCode: 27,
      keyName: 'Escape'
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === Key.ESCAPE.keyCode) {
      evt.preventDefault();
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === Key.ENTER.keyCode) {
      action();
    }
  };

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomFromArray = function (arr) {
    return arr[getRandomInt(0, arr.length - 1)];
  };

  var getShuffledArray = function (arr) {
    var randomComparator = function () {
      return 0.5 - Math.random();
    };
    return arr.slice().sort(randomComparator);
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

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomInt: getRandomInt,
    getRandomFromArray: getRandomFromArray,
    getShuffledArray: getShuffledArray,
    debounce: debounce
  };

})();
