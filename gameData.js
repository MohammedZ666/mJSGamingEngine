class GameConfig {
  constructor({ canvasId, gameSpeed, gameFrame }) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.height = this.canvas.clientHeight;
    this.gameSpeed = gameSpeed;
    this.gameFrame = gameFrame;
  }
}

export default GameConfig;
