'use strict';

window.util = (function () {

  var Keys = {
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
    if (evt.keyCode === Keys.ESCAPE.keyCode) {
      evt.preventDefault();
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === Keys.ENTER.keyCode) {
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

  return {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomInt: getRandomInt,
    getRandomFromArray: getRandomFromArray,
    getShuffledArray: getShuffledArray
  };

})();
