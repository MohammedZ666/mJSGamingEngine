class GameLoop {
  constructor({ gameConfig, sprites, backgrounds }) {
    this.gameConfig = gameConfig;
    this.sprites = sprites;
    this.backgrounds = backgrounds;
  }
  setBackgrounds(backgrounds) {
    this.backgrounds = backgrounds;
  }
  setSprites(sprites) {
    this.sprites = sprites;
  }
  drawText({
    text,
    posX,
    posY,
    fontFace = "'Press Start 2P'",
    fontSize = 20,
    color = "white",
    strokeColor = "black",
    strokeWidth = 1.2,
  }) {
    this.gameConfig.context.save();
    this.gameConfig.context.font = `${fontSize}px ${fontFace}`;
    this.gameConfig.context.fillStyle = color;
    this.gameConfig.context.strokeStyle = strokeColor;
    this.gameConfig.context.lineWidth = strokeWidth;
    this.gameConfig.context.fillText(text, posX, posY);
    this.gameConfig.context.strokeText(text, posX, posY);
    this.gameConfig.context.restore();
  }
  render(spawn) {
    this.gameConfig.context.clearRect(
      0,
      0,
      this.gameConfig.canvasWidth,
      this.gameConfig.canvasHeight
    );

    this.backgrounds.draw();
    this.sprites.draw();

    this.gameConfig.update();
    if (this.gameConfig.debug) {
      let text = `GameFrame ${this.gameConfig.gameFrame}/${this.gameConfig.maxFrame}`;
      this.drawText({ text: text, posX: 50, posY: 50 });
    }
    spawn();

    requestAnimationFrame(() => this.render(spawn));
  }
}
export default GameLoop;
