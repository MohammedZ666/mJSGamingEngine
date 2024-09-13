/**@type {HTMLCanvasElement}*/
import Layer from "./layer.js";
import Sprite from "./sprite.js";
import GameConfig from "./gameData.js";

const gameConfig = new GameConfig({
  canvasId: "canvas1",
  gameFrame: 0,
  gameSpeed: 5,
});

const context = gameConfig.context;
const canvasWidth = gameConfig.canvasWidth;
const canvasHeight = gameConfig.canvasHeight;
let gameFrame = gameConfig.gameFrame;
let gameSpeed = gameConfig.gameSpeed;

let layers = [
  { src: "backgroundLayers/layer-1.png", speed: 0.2 },
  { src: "backgroundLayers/layer-2.png", speed: 0.4 },
  { src: "backgroundLayers/layer-3.png", speed: 0.6 },
  { src: "backgroundLayers/layer-4.png", speed: 0.8 },
  { src: "backgroundLayers/layer-5.png", speed: 1 },
];

function drawBackground() {
  layers.forEach((layer) => {
    layer.draw();
    layer.update();
  });
}

let enemies = [];
function drawEnemy() {
  enemies.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  });
}

const gameLoop = async () => {
  for (let i = 0; i < 2; i++) {
    let enemy = new Sprite({
      context: context,
      gameFrame: gameFrame,
      x: 0,
      y: 0,
      scale: 0.5,
      imageSrc: "spriteSheets/enemy1.png",
      spritesInImage: 6,
      spriteRow: 0,
      animationSpeed: 10,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
    });
    await enemy.init();
    enemies.push(enemy);
  }

  for (let i = 0; i < layers.length; i++) {
    layers[i] = new Layer({
      context: context,
      imageSrc: layers[i]["src"],
      speedModifier: layers[i]["speed"],
      gameSpeed: gameSpeed,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
    });
    await layers[i].init();
  }

  function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    drawEnemy();
    gameFrame = (gameFrame + 1) % 100;
    requestAnimationFrame(animate);
  }

  animate();
};

gameLoop();
