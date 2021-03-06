'use strict';

(function () {

  var TIMEOUT = 20000;

  var Url = {
    SAVE: 'https://javascript.pages.academy/code-and-magick',
    LOAD: 'https://javascript.pages.academy/code-and-magick/data'
  };

  var StatusCode = {
    OK: 200
  };

  var createRequest = function (method, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
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
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    createRequest('GET', Url.LOAD, null, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    createRequest('POST', Url.SAVE, data, onLoad, onError);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
