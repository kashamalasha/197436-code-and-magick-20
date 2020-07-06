'use strict';

window.validate = (function () {
  return function (input) {
    input.addEventListener('invalid', function () {
      if (input.validity.tooShort) {
        input.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (input.validity.tooLong) {
        input.setCustomValidity('Имя не должно превышать 25 символов');
      } else if (input.validity.valueMissing) {
        input.setCustomValidity('Обязательное поле');
      } else {
        input.setCustomValidity('');
      }
    });
  };
})();
