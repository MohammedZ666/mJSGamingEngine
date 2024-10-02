/**@type {HTMLCanvasElement}*/
import GameConfig from "./GameConfig.js";
import GameLoop from "./GameLoop.js";
import LayerParallaxLeftToRight from "./Layer.js";
import ParallaxBackground from "./ParallaxBackground.js";
import Sprite from "./Sprite.js";
import SpriteArray from "./SpriteArray.js";

const gameConfig = new GameConfig({
  canvasId: "canvas1",
  startFrame: 0,
  maxFrame: 15000,
  gameSpeed: 4,
  debug: true,
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
    x: Math.round(Math.random() * gameConfig.canvasWidth),
    y: Math.round(Math.random() * gameConfig.canvasHeight),
    scale: 0.5,
    imageSrc: "spriteSheets/enemy1.png",
    spritesPerRow: 6,
    maxSpritesPerRow: 6,
    maxRows: 1,
    spriteRow: 0,
    animationSpeed: 5,
  });
  enemies.push(enemy);
}
enemies = new SpriteArray({ sprites: enemies, gameConfig: gameConfig });

let enemies2 = [];
for (let i = 0; i < 1; i++) {
  let enemy = new Sprite({
    x: 200,
    y: 200,
    scale: 0.5,
    imageSrc: "spriteSheets/shadow_dog.png",
    spritesPerRow: 7,
    maxSpritesPerRow: 12,
    spriteRow: 0,
    maxRows: 10,
    animationSpeed: 5,
  });
  enemies2.push(enemy);
}
enemies2 = new SpriteArray({ sprites: enemies2, gameConfig: gameConfig });

let gameLoop = new GameLoop({
  gameConfig: gameConfig,
  sprites: enemies,
  backgrounds: bg,
});
function levelOne() {
  if (gameConfig.gameFrame < 6000) {
    gameLoop.drawText({
      text: "Inside First Sublevel",
      posX: 200,
      posY: 600,
      fontSize: 15,
      strokeWidth: 0.5,
    });
  } else if (gameConfig.gameFrame < 10000) {
    gameLoop.drawText({
      text: "Inside Second Sublevel",
      posX: 200,
      posY: 600,
      fontSize: 15,
      strokeWidth: 0.5,
    });
    gameLoop.setSprites(enemies2);
  } else {
    gameLoop.drawText({
      text: "End Level",
      posX: 200,
      posY: 600,
      fontSize: 15,
      strokeWidth: 0.5,
    });
  }
}
gameLoop.render(levelOne);
