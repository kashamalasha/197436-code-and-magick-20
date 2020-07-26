'use strict';

(function () {

  var PLAYERS_QUANTITY = 4;

  var setupDialog = document.querySelector('.setup');
  var inputUserName = setupDialog.querySelector('.setup-user-name');
  var similarElement = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');

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
    similarListElement.appendChild(window.wizard.renderWizards(similarWizards));
    similarElement.appendChild(similarListElement);
    similarElement.classList.remove('hidden');
  };

  window.backend.load(onSuccess, onError);

  window.validate.formInput(inputUserName);

})();
