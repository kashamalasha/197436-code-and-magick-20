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

var getFullName = function (mode) {
  var fullName;

  switch (mode) {
    case 1:
      fullName = getRandomFromArray(FIRST_NAMES) + ' ' + getRandomFromArray(SECOND_NAMES);
      break;
    case 2:
      fullName = getRandomFromArray(SECOND_NAMES) + ' ' + getRandomFromArray(FIRST_NAMES);
      break;
  }

  return fullName;
};

var generateWizards = function (qty) {
  var arr = [];

  for (var i = 0; i < qty; i++) {
    arr.push({
      name: getFullName(getRandomInt(1, 2)),
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

var renderWizards = function (listElement) {
  var fragment = document.createDocumentFragment();
  var playersArray = generateWizards(PLAYER_QTY);

  for (var j = 0; j < playersArray.length; j++) {
    listElement.appendChild(renderWizard(playersArray[j]));
  }

  return fragment.appendChild(listElement);
};

similarElement.appendChild(renderWizards(similarListElement));

similarElement.classList.remove('hidden');
setupDialog.classList.remove('hidden');
