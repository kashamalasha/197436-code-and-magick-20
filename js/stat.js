'use strict';

var CLOUD = {
  X: 100,
  Y: 10,
  W: 420,
  H: 270,
  SHADOW_GAP: 10
};
var COLOR = {
  CLOUD: '#ffffff',
  SHADOW: 'rgba(0, 0, 0, 0.7)',
  TEXT: '#000000',
  PLAYER: 'rgba(255, 0, 0, 1)'
};
var TEXT = {
  STYLE: '16px PT Mono',
  LINE_HEIGHT: 20,
  GAP: 30
};

var HISTOGRAM = {
  SIZE: 150,
  WIDTH: 40,
  GAP: 50
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getHistogramColor = function () {
  var saturate = getRandomInt(0, 100);
  return 'hsl(240, ' + saturate + '%, 50%)';
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
  ctx.fillRect(x, y, CLOUD.W, CLOUD.H);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD.X + CLOUD.SHADOW_GAP, CLOUD.Y + CLOUD.SHADOW_GAP, COLOR.SHADOW);
  renderCloud(ctx, CLOUD.X, CLOUD.Y, COLOR.CLOUD);

  ctx.fillStyle = COLOR.TEXT;
  ctx.font = TEXT.STYLE;
  ctx.fillText('Ура! Вы победили!', CLOUD.X + TEXT.GAP, CLOUD.Y + TEXT.LINE_HEIGHT * 2);
  ctx.fillText('Список результатов:', CLOUD.X + TEXT.GAP, CLOUD.Y + TEXT.LINE_HEIGHT * 3);

  var maxTime = getMaxElement(times);

  var getScore = function (time) {
    return Math.floor((HISTOGRAM.SIZE * time) / maxTime);
  };

  var renderScore = function (name, time) {
    playerScore = getScore(time);
    playerPosY = histogramPosY + (HISTOGRAM.SIZE - playerScore);
    ctx.fillStyle = COLOR.TEXT;
    ctx.fillText(Math.floor(time), histogramPosX, playerPosY - (TEXT.LINE_HEIGHT / 2));
    ctx.fillStyle = (name === 'Вы') ? COLOR.PLAYER : getHistogramColor();
    ctx.fillRect(histogramPosX, playerPosY, HISTOGRAM.WIDTH, playerScore);
    ctx.fillStyle = COLOR.TEXT;
    ctx.fillText(name, histogramPosX, histogramPosY + HISTOGRAM.SIZE + TEXT.LINE_HEIGHT);
  };

  var histogramPosX = CLOUD.X;
  var histogramPosY = TEXT.LINE_HEIGHT * 5;
  var playerPosY = 0;
  var playerScore = 0;

  for (var i = 0; i < names.length; i++) {
    histogramPosX += HISTOGRAM.GAP;
    renderScore(names[i], times[i]);
    histogramPosX += HISTOGRAM.WIDTH;
  }
};
