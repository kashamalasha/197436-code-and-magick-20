'use strict';

(function () {

  var setupDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupDialog.querySelector('.setup-close');
  var inputUserName = setupDialog.querySelector('.setup-user-name');
  var setupFormSubmit = setupDialog.querySelector('.setup-submit');

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== inputUserName) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    setupDialog.classList.remove('hidden');

    setupDialog.style.left = '';
    setupDialog.style.top = '';

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
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupFormSubmit.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt,
        setupDialog.querySelector('.setup-wizard-dialog').submit()
    );
  });

})();
