class GameConfig {
  constructor({ canvasId, gameSpeed, startFrame, maxFrame, debug }) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    document.fonts.ready.then(() => {
      this.context.font = "20px 'Press Start 2P'";
      this.context.fillStyle = "white";
      this.context.strokeStyle = "black";
      this.context.lineWidth = 1.2;
    });

    this.canvasWidth = this.canvas.width = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.height = this.canvas.clientHeight;
    this.gameSpeed = gameSpeed;
    this.gameFrame = typeof startFrame === "undefined" ? 0 : startFrame;
    this.maxFrame = typeof maxFrame === "undefined" ? Infinity : maxFrame;
    this.debug = typeof debug === "undefined" ? false : debug;
  }

  update() {
    if (this.gameFrame < this.maxFrame)
      this.gameFrame = this.gameFrame + this.gameSpeed;
  }
}

export default GameConfig;
