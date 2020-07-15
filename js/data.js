'use strict';

(function () {

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYE_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var SECOND_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var getRandomName = function () {
    return window.util.getShuffledArray([
      window.util.getRandomFromArray(FIRST_NAMES),
      window.util.getRandomFromArray(SECOND_NAMES)
    ]).join(' ');
  };

  var generateWizards = function (quantity) {
    var arr = [];

    for (var i = 0; i < quantity; i++) {
      arr.push({
        name: getRandomName(),
        colorCoat: window.util.getRandomFromArray(COAT_COLORS),
        colorEyes: window.util.getRandomFromArray(EYE_COLORS)
      });
    }

    return arr;
  };

  window.data = {
    COAT_COLORS: COAT_COLORS,
    EYE_COLORS: EYE_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    generateWizards: generateWizards
  };

})();
