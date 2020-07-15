'use strict';

(function () {

  var url = {
    SAVE: 'https://javascript.pages.academy/code-and-magick',
    LOAD: 'https://javascript.pages.academy/code-and-magick/data'
  };

  var statusCode = {
    OK: 200
  };

  var TIMEOUT = 20000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          onLoad(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Таймаут: ' + xhr.timeout + 'мс.');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', url.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Таймаут: ' + xhr.timeout + 'мс.');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('POST', url.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
