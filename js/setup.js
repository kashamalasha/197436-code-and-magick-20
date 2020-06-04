'use strict';

var PLAYER_QTY = 4;

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

var COAT_COLOR = {
  LIGHT_BLUE: 'rgb(101, 137, 164)',
  RED: 'rgb(241, 43, 107)',
  PURPLE: 'rgb(146, 100, 161)',
  GREEN: 'rgb(56, 159, 117)',
  YELLOW: 'rgb(215, 210, 55)',
  BLACK: 'rgb(0, 0, 0)'
};

var EYE_COLOR = {
  BLACK: '#000000',
  RED: '#ff0000',
  BLUE: '#0000ff',
  YELLOW: '#ffff00',
  GREEN: '#00ff00'
};

var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
                        .content
                        .querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[getRandomInt(0, keys.length - 1)]];
};

var getFullName = function () {
  return FIRST_NAMES[getRandomInt(0, FIRST_NAMES.length - 1)] + ' ' + SECOND_NAMES[getRandomInt(0, SECOND_NAMES.length - 1)];
};

var players = [];

for (var i = 0; i < PLAYER_QTY; i++) {
  players.push({
    name: getFullName(),
    coatColor: getRandomProperty(COAT_COLOR),
    eyeColor: getRandomProperty(EYE_COLOR)
  });
}

var createWizard = function (proto) {
  var wizard = WIZARD_TEMPLATE.cloneNode(true);

  var wizardName = wizard.querySelector('.setup-similar-label');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');

  wizardName.textContent = proto.name;
  wizardCoat.style.fill = proto.coatColor;
  wizardEyes.style.fill = proto.eyeColor;

  return wizard;
};

var setupDialog = document.querySelector('.setup');
var similarElement = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

for (var j = 0; j < players.length; j++) {
  similarListElement.appendChild(createWizard(players[j]));
}

fragment.appendChild(similarListElement);
similarElement.appendChild(fragment);

similarElement.classList.remove('hidden');
setupDialog.classList.remove('hidden');
