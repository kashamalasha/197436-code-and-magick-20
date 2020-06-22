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

var ColorNames = {
  BLACK: {
    rgb: 'rgb(0, 0, 0)'
  },
  RED: {
    rgb: 'rgb(255, 0, 0)'
  },
  BLUE: {
    rgb: 'rgb(0, 0, 255)'
  },
  YELLOW: {
    rgb: 'rgb(255, 255, 0)'
  },
  GREEN: {
    rgb: 'rgb(0, 128, 0)'
  },
  fromId: function (id) {
    return this[id.toUpperCase()];
  }
};

var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
                        .content
                        .querySelector('.setup-similar-item');

var setupDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupDialog.querySelector('.setup-close');
var inputUserName = setupDialog.querySelector('.setup-user-name');
var setupFormSubmit = setupDialog.querySelector('.setup-submit');
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
};

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

var hexToRGB = function (hex) {
  var r = '0x' + hex[1] + hex[2];
  var g = '0x' + hex[3] + hex[4];
  var b = '0x' + hex[5] + hex[6];

  return 'rgb(' + +r + ', ' + +g + ', ' + +b + ')';
};

var setNewColor = function (element, colors) {
  var newColor = getRandomFromArray(colors);
  var regexRGB = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i;
  var regexHex = /^#([0-9A-F]{3}){1,2}$/i;
  var isSimilar = false;
  var currentColor;

  if (element instanceof SVGUseElement) {
    currentColor = window.getComputedStyle(element).fill;
  } else {
    currentColor = window.getComputedStyle(element).backgroundColor;
  }

  if (regexHex.test(newColor)) {
    isSimilar = (currentColor === hexToRGB(newColor));
  } else if (!regexRGB.test(newColor)) {
    isSimilar = (currentColor === ColorNames.fromId(newColor).rgb);
  } else {
    isSimilar = (currentColor === newColor);
  }

  while (isSimilar) {
    newColor = setNewColor(element, colors);
    isSimilar = false;
  }

  return newColor;
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== inputUserName) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setupDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};


setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

setupFormSubmit.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setupDialog.querySelector('.setup-wizard-dialog').submit();
  }
});

inputUserName.addEventListener('invalid', function () {
  if (inputUserName.validity.tooShort) {
    inputUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (inputUserName.validity.tooLong) {
    inputUserName.setCustomValidity('Имя не должно превышать 25 символов');
  } else if (inputUserName.validity.valueMissing) {
    inputUserName.setCustomValidity('Обязательное поле');
  } else {
    inputUserName.setCustomValidity('');
  }
});

Wizard.coat.addEventListener('click', function (evt) {
  var newColor = setNewColor(evt.currentTarget, COAT_COLORS);
  Wizard.coat.style.fill = newColor;
  setupPlayer.querySelector('input[name="coat-color"]').value = newColor;
});

Wizard.eyes.addEventListener('click', function (evt) {
  var newColor = setNewColor(evt.currentTarget, EYE_COLORS);
  Wizard.eyes.style.fill = newColor;
  setupPlayer.querySelector('input[name="eyes-color"]').value = newColor;
});

Wizard.fireball.addEventListener('click', function (evt) {
  var newColor = setNewColor(evt.currentTarget, FIREBALL_COLORS);
  Wizard.fireball.style.backgroundColor = newColor;
  Wizard.fireball.querySelector('input[name="fireball-color"]').value = newColor;
});
