'use strict';

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
  '#000000',
  '#ff0000',
  '#0000ff',
  '#ffff00',
  '#00ff00'
];

var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
                        .content
                        .querySelector('.setup-similar-item');

var setupDialog = document.querySelector('.setup');
var similarElement = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomFromArray = function (arr) {
  return arr[getRandomInt(0, arr.length - 1)];
};

var shuffleArray = function (arr) {
  var randomComparator = function () {
    return 0.5 - Math.random();
  };
  return arr.slice().sort(randomComparator);
};

var getRandomName = function () {
  return shuffleArray([
    getRandomFromArray(FIRST_NAMES),
    getRandomFromArray(SECOND_NAMES)
  ]).join(' ');
}

var generateWizards = function (qty) {
  var arr = [];

  for (var i = 0; i < qty; i++) {
    arr.push({
      name: getRandomName(),
      coatColor: getRandomFromArray(COAT_COLORS),
      eyeColor: getRandomFromArray(EYE_COLORS)
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
setupDialog.classList.remove('hidden');
