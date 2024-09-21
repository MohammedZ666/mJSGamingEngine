/**@type {HTMLCanvasElement}*/
import Sprite from "./Sprite.js";
import GameConfig from "./GameConfig.js";
import LayerParallaxLeftToRight from "./layer.js";

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
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-1.png",
    speedModifier: 0.2,
    gameConfig: gameConfig,
  }),
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-2.png",
    speedModifier: 0.4,
    gameConfig: gameConfig,
  }),
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-3.png",
    speedModifier: 0.6,
    gameConfig: gameConfig,
  }),
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-4.png",
    speedModifier: 0.8,
    gameConfig: gameConfig,
  }),
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-5.png",
    speedModifier: 1,
    gameConfig: gameConfig,
  }),
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
      gameConfig: gameConfig,
      x: 0,
      y: 0,
      scale: 0.5,
      imageSrc: "spriteSheets/enemy1.png",
      spritesInImage: 6,
      spriteRow: 0,
      animationSpeed: 5,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
    });
    await enemy.init();
    enemies.push(enemy);
  }

  for (let i = 0; i < layers.length; i++) {
    await layers[i].init();
  }

  function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    drawEnemy();
    gameConfig.update();
    requestAnimationFrame(animate);
  }

  animate();
};

gameLoop();
