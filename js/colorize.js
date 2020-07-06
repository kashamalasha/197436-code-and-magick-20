'use strict';

window.colorize = (function () {

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

  var hexToRGB = function (hex) {
    var r = '0x' + hex[1] + hex[2];
    var g = '0x' + hex[3] + hex[4];
    var b = '0x' + hex[5] + hex[6];

    return 'rgb(' + +r + ', ' + +g + ', ' + +b + ')';
  };

  var setNewColor = function (element, colors) {
    var newColor = window.util.getRandomFromArray(colors);
    var regexRGB = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i;
    var regexHex = /^#([0-9A-F]{3}){1,2}$/i;
    var isSimilar = false;
    var currentColor;

    if (element.tagName.toLowerCase() === 'div') {
      currentColor = window.getComputedStyle(element).backgroundColor;
    } else {
      currentColor = window.getComputedStyle(element).fill;
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

  return function (element, colors, inputName) {
    element.addEventListener('click', function () {
      var newColor = setNewColor(element, colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = newColor;
      } else {
        element.style.fill = newColor;
      }
      document.querySelector('input[name="' + inputName + '"]').value = newColor;
    });
  };

})();
