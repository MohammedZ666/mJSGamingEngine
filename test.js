/**@type {HTMLCanvasElement}*/
import GameConfig from "./GameConfig.js";
import GameLoop from "./GameLoop.js";
import LayerParallaxLeftToRight from "./Layer.js";
import ParallaxBackground from "./ParallaxBackground.js";
import Sprite from "./Sprite.js";
import SpriteArray from "./SpriteArray.js";

const gameConfig = new GameConfig({
  canvasId: "canvas1",
  gameFrame: 0,
  gameSpeed: 4,
});

let layers = [
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-1.png",
    speedModifier: 0.2,
  }),
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-2.png",
    speedModifier: 0.4,
  }),
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-3.png",
    speedModifier: 0.6,
  }),
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-4.png",
    speedModifier: 0.8,
  }),
  new LayerParallaxLeftToRight({
    imageSrc: "backgroundLayers/layer-5.png",
    speedModifier: 1,
  }),
];

let bg = new ParallaxBackground({ gameConfig: gameConfig, layers: layers });
let enemies = [];

for (let i = 0; i < 5; i++) {
  let enemy = new Sprite({
    x: 250,
    y: 300,
    scale: 0.5,
    imageSrc: "spriteSheets/enemy1.png",
    spritesInImage: 6,
    spriteRow: 0,
    animationSpeed: 5,
  });
  enemies.push(enemy);
}
enemies = new SpriteArray({ sprites: enemies, gameConfig: gameConfig });
let gameLoop = new GameLoop(gameConfig);
gameLoop.render(enemies, bg);
