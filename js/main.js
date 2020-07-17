'use strict';

(function () {

  var PLAYERS_QUANTITY = 4;

  var setupDialog = document.querySelector('.setup');
  var inputUserName = setupDialog.querySelector('.setup-user-name');
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

  var similarElement = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');

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

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSuccess = function (arr) {
    var similarWizards = arr.slice(0, PLAYERS_QUANTITY);
    similarListElement.appendChild(renderWizards(similarWizards));
    similarElement.appendChild(similarListElement);
    similarElement.classList.remove('hidden');
  };

  window.backend.load(onSuccess, onError);

  window.validate.formInput(inputUserName);

  window.colorize(wizardElements.coat, window.data.COAT_COLORS);
  window.colorize(wizardElements.eyes, window.data.EYE_COLORS);
  window.colorize(wizardElements.fireball, window.data.FIREBALL_COLORS);

})();
