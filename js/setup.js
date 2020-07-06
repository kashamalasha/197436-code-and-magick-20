'use strict';

(function () {

  var PLAYERS_QUANTITY = 4;

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

  var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
                          .content
                          .querySelector('.setup-similar-item');

  var setupDialog = document.querySelector('.setup');
  var inputUserName = setupDialog.querySelector('.setup-user-name');
  var setupPlayer = setupDialog.querySelector('.setup-player');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');
  var wizardElement = setupWizard.querySelector('.wizard');
  var Wizard = {
    coat: wizardElement.querySelector('.wizard-coat'),
    eyes: wizardElement.querySelector('.wizard-eyes'),
    fireball: setupDialog.querySelector('.setup-fireball-wrap')
  };

  var similarElement = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');

  var getRandomName = function () {
    return window.util.getShuffledArray([
      window.util.getRandomFromArray(FIRST_NAMES),
      window.util.getRandomFromArray(SECOND_NAMES)
    ]).join(' ');
  };

  var generateWizards = function (qty) {
    var arr = [];

    for (var i = 0; i < qty; i++) {
      arr.push({
        name: getRandomName(),
        coatColor: window.util.getRandomFromArray(COAT_COLORS),
        eyeColor: window.util.getRandomFromArray(EYE_COLORS)
      });
    }

    return arr;
  };

  var renderWizard = function (proto) {
    var wizard = WIZARD_TEMPLATE.cloneNode(true);

    var wizardName = wizard.querySelector('.setup-similar-label');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');

    wizardName.textContent = proto.name;
    wizardCoat.style.fill = proto.coatColor;
    wizardEyes.style.fill = proto.eyeColor;

    return wizard;
  };

  var renderWizards = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }

    return fragment;
  };

  var playersArray = generateWizards(PLAYERS_QUANTITY);

  similarListElement.appendChild(renderWizards(playersArray));
  similarElement.appendChild(similarListElement);

  similarElement.classList.remove('hidden');

  window.validate(inputUserName);

  window.colorize(Wizard.coat, COAT_COLORS, 'coat-color');
  window.colorize(Wizard.eyes, EYE_COLORS, 'eyes-color');
  window.colorize(Wizard.fireball, FIREBALL_COLORS, 'fireball-color');

})();
