class GameLoop {
  constructor(gameConfig) {
    this.gameConfig = gameConfig;
  }
  render(sprites, backgrounds) {
    this.gameConfig.context.clearRect(
      0,
      0,
      this.gameConfig.canvasWidth,
      this.gameConfig.canvasHeight
    );
    backgrounds.draw();
    sprites.draw();
    this.gameConfig.update();
    requestAnimationFrame(() => this.render(sprites, backgrounds));
  }
}
export default GameLoop;
