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

  var setupDialog = document.querySelector('.setup');
  var setupPlayer = setupDialog.querySelector('.setup-player');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');
  var wizardElement = setupWizard.querySelector('.wizard');

  var wizardElements = {
    coat: {
      element: wizardElement.querySelector('.wizard-coat'),
      input: setupPlayer.querySelector('input[name="coat-color"]')
    },
    eyes: {
      element: wizardElement.querySelector('.wizard-eyes'),
      input: setupPlayer.querySelector('input[name="eyes-color"]')
    },
    fireball: {
      element: setupDialog.querySelector('.setup-fireball-wrap'),
      input: setupPlayer.querySelector('input[name="fireball-color"]')
    }
  };

  var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
                          .content
                          .querySelector('.setup-similar-item');


  var renderWizard = function (proto) {
    var wizard = WIZARD_TEMPLATE.cloneNode(true);

    var wizardName = wizard.querySelector('.setup-similar-label');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');

    wizardName.textContent = proto.name;
    wizardCoat.style.fill = proto.colorCoat;
    wizardEyes.style.fill = proto.colorEyes;

    return wizard;
  };

  var renderWizards = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }

    return fragment;
  };

  window.colorize(wizardElements.coat, COAT_COLORS);
  window.colorize(wizardElements.eyes, EYE_COLORS);
  window.colorize(wizardElements.fireball, FIREBALL_COLORS);

  window.wizard = {
    renderWizards: renderWizards
  };

})();
