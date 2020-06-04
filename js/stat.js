'use strict';

var CLOUD = {
  X: 100,
  Y: 10,
  W: 420,
  H: 270,
  SHADOW_GAP: 10
};

var COLOR = {
  WHITE: '#ffffff',
  GRAY: 'rgba(0, 0, 0, 0.7)',
  BLACK: '#000000',
  RED: 'rgba(255, 0, 0, 1)'
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

var Message = {
  YOUR_RESULT: 'Ура! Вы победили!',
  RESULTS_TITLE: 'Список результатов:'
};

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getHistogramColor = function () {
  var saturation = getRandomInt(0, 100);
  return 'hsl(240, ' + saturation + '%, 50%)';
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

var getPlayerColor = function (name) {
  return (name === 'Вы') ? COLOR.RED : getHistogramColor();
};

var renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderScore = function (ctx, x, name, time, maxTime) {
  var playerScore;
  var playerPosY;
  var histogramPosY = TEXT.LINE_HEIGHT * 5;

  playerScore = Math.floor((HISTOGRAM.SIZE * time) / maxTime);
  playerPosY = histogramPosY + (HISTOGRAM.SIZE - playerScore);

  ctx.fillStyle = COLOR.BLACK;
  ctx.fillText(Math.floor(time), x, playerPosY - (TEXT.LINE_HEIGHT / 2));

  renderRect(ctx, x, playerPosY, HISTOGRAM.WIDTH, playerScore, getPlayerColor(name));

  ctx.fillStyle = COLOR.BLACK;
  ctx.fillText(name, x, histogramPosY + HISTOGRAM.SIZE + TEXT.LINE_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, CLOUD.X + CLOUD.SHADOW_GAP, CLOUD.Y + CLOUD.SHADOW_GAP, CLOUD.W, CLOUD.H, COLOR.GRAY);
  renderRect(ctx, CLOUD.X, CLOUD.Y, CLOUD.W, CLOUD.H, COLOR.WHITE);

  ctx.fillStyle = COLOR.BLACK;
  ctx.font = TEXT.STYLE;
  ctx.fillText(Message.YOUR_RESULT, CLOUD.X + TEXT.GAP, CLOUD.Y + TEXT.LINE_HEIGHT * 2);
  ctx.fillText(Message.RESULTS_TITLE, CLOUD.X + TEXT.GAP, CLOUD.Y + TEXT.LINE_HEIGHT * 3);

  var maxTime = getMaxElement(times);
  var posX = CLOUD.X;

  for (var i = 0; i < names.length; i++) {
    posX += HISTOGRAM.GAP;
    renderScore(ctx, posX, names[i], times[i], maxTime);
    posX += HISTOGRAM.WIDTH;
  }
};
