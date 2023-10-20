let canvas, ctx;
const canvasWidth = 1200,
  canvasHeight = 800;
const cellWidth = 3;
const fps = 30;
let lifeworld;

window.onload = init;

function init() {
  canvas = document.querySelector("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx = canvas.getContext("2d");
  // TODO: init lifeworld
  lifeworld = new Lifeworld(600, 400, 0.2);

  loop();
}

function drawWorld() {
  ctx.save();
  for (let col = 0; col < lifeworld.numCols; col++) {
    for (let row = 0; row < lifeworld.numRows; row++) {
      drawCell(col, row, cellWidth, lifeworld.world[col][row]);
    }
  }
  ctx.restore();
}

function drawCell(col, row, dimensions, alive) {
  ctx.beginPath();
  ctx.rect(col * dimensions, row * dimensions, dimensions, dimensions);
  ctx.fillStyle = alive ? "red" : "rgba(0,0,0,0)";
  ctx.fill();
}

function loop() {
  setTimeout(loop, 1000 / fps);
  // TODO: update lifeworld
  drawBackground();
  drawWorld();
  lifeworld.step();
}

function drawBackground() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.globalAlpha = 4 / fps;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.restore();
}
