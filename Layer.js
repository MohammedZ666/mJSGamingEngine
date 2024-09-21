class LayerParallaxLeftToRight {
  constructor({ imageSrc, speedModifier, zIndex }) {
    this.x = 0;
    this.image = new Image();
    this.image.src = imageSrc;
    this.zIndex = zIndex ? zIndex : 0;
    this.speedModifier = speedModifier;
    this.isInitCalled = false;
  }
  async init(gameConfig) {
    await this.image.decode();
    this.gameConfig = gameConfig;
    this.speed = Math.floor(this.speedModifier * this.gameConfig.gameSpeed);
    this.k = this.image.width / this.gameConfig.canvasWidth - 1;
    this.isInitCalled = true;
  }
  update() {
    if (!this.isInitCalled)
      throw Error("Please call the init() method before calling update().");

    this.x =
      -this.x >= this.image.width - this.speed
        ? this.image.width + (this.x - this.speed)
        : this.x - this.speed;
  }

  draw() {
    if (!this.isInitCalled)
      throw Error("Please call the init() method before calling draw().");

    if (-this.x > this.k * this.gameConfig.canvasWidth) {
      this.gameConfig.context.drawImage(
        this.image,
        this.x + this.image.width,
        0
      );
    }
    this.gameConfig.context.drawImage(this.image, this.x, 0);
  }
}

export default LayerParallaxLeftToRight;
