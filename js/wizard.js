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

  var SIMILAR_WIZARD_QUANTITY = 4;

  var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
                          .content
                          .querySelector('.setup-similar-item');

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

  var similarElement = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');

  var wizards = [];

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

  var getRank = function (wizard) {
    var coatColor = window.color.getCurrentColor(wizardElements.coat.element);
    var eyesColor = window.color.getCurrentColor(wizardElements.eyes.element);
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (window.color.Color.fromId(wizard.colorEyes).rgb === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var unsortedWizards = window.wizard.wizards;

    var sortedWizards = unsortedWizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });

    var similarWizards = sortedWizards.slice(0, SIMILAR_WIZARD_QUANTITY);

    if (similarListElement.childElementCount > 0) {
      window.domUtil.removeChildren(similarListElement);
    }

    similarListElement.appendChild(renderWizards(similarWizards));
    similarElement.appendChild(similarListElement);
    similarElement.classList.remove('hidden');
  };

  window.wizard = {
    updateWizards: updateWizards,
    COAT_COLORS: COAT_COLORS,
    EYE_COLORS: EYE_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    wizardElements: wizardElements,
    wizards: wizards
  };

})();
