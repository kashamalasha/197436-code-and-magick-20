'use strict'

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_W = 420;
var CLOUD_H = 270;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_SHADOW_GAP = 10;
var CLOUD_TEXT_COLOR = '#000000';
var CLOUD_TEXT_STYLE = '16px PT Mono';
var CLOUD_TEXT_LINE_HEIGHT = 20;
var CLOUD_TEXT_GAP = 30;

var histogramHeight = 150;
var histogramWidth = 40;
var histogramDist = 50;
var histogramPlayerColor = 'rgba(255, 0, 0, 1)';

var getHistogramColor = function () {
  var sat = Math.floor(Math.random() * 100);
  return 'hsl(240, ' + sat + '%, 50%)';
};

var getMaxElement = function (arr) {
  var max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  return max;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_W, CLOUD_H);
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_GAP, CLOUD_Y + CLOUD_SHADOW_GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = CLOUD_TEXT_COLOR;
  ctx.font = CLOUD_TEXT_STYLE;
  ctx.fillText('Ура! Вы победили!', CLOUD_X + CLOUD_TEXT_GAP, CLOUD_Y + CLOUD_TEXT_LINE_HEIGHT * 2);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_TEXT_GAP, CLOUD_Y + CLOUD_TEXT_LINE_HEIGHT * 3);

  var maxTime = getMaxElement(times);

  var getScore = function (time) {
    return Math.floor((histogramHeight * time) / maxTime);
  };

  var histogramPosX = CLOUD_X;
  var histogramPosY = CLOUD_TEXT_LINE_HEIGHT * 5;
  var playerPosY = 0;
  var playerScore = 0;

  for (var i = 0; i < names.length; i++) {
    histogramPosX += histogramDist;
    playerScore = getScore(times[i]);
    playerPosY = histogramPosY + (histogramHeight - playerScore);

    ctx.fillStyle = CLOUD_TEXT_COLOR;
    ctx.fillText(Math.floor(times[i]), histogramPosX, playerPosY - (CLOUD_TEXT_LINE_HEIGHT / 2));

    ctx.fillStyle = (names[i] === 'Вы') ? histogramPlayerColor : getHistogramColor();
    ctx.fillRect(histogramPosX, playerPosY, histogramWidth, playerScore);

    ctx.fillStyle = CLOUD_TEXT_COLOR;
    ctx.fillText(names[i], histogramPosX, histogramPosY + histogramHeight + CLOUD_TEXT_LINE_HEIGHT);
    histogramPosX += histogramWidth;
  }
};
