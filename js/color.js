'use strict';

(function () {

  var REGEX_RGB = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i;
  var REGEX_HEX = /^#([0-9A-F]{3}){1,2}$/i;

  var Color = {
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

  var getCurrentColor = function (element) {
    if (element.tagName.toLowerCase() === 'div') {
      return window.getComputedStyle(element).backgroundColor;
    } else {
      return window.getComputedStyle(element).fill;
    }
  };

  var setNewColor = function (element, colors) {
    var newColor = window.util.getRandomFromArray(colors);
    var isSimilar = false;
    var currentColor = getCurrentColor(element);

    if (REGEX_HEX.test(newColor)) {
      isSimilar = (currentColor === hexToRGB(newColor));
    } else if (!REGEX_RGB.test(newColor)) {
      isSimilar = (currentColor === Color.fromId(newColor).rgb);
    } else {
      isSimilar = (currentColor === newColor);
    }

    while (isSimilar) {
      newColor = setNewColor(element, colors);
      isSimilar = false;
    }

    return newColor;
  };

  var colorize = function (obj, colors) {
    obj.element.addEventListener('click', function () {
      var newColor = setNewColor(obj.element, colors);
      if (obj.element.tagName.toLowerCase() === 'div') {
        obj.element.style.backgroundColor = newColor;
      } else {
        obj.element.style.fill = newColor;
      }
      obj.input.value = newColor;

      var updateSimilarWizards = window.util.debounce(window.wizard.updateWizards);
      updateSimilarWizards();
    });
  };

  window.color = {
    colorize: colorize,
    getCurrentColor: getCurrentColor,
    Color: Color
  };

})();
