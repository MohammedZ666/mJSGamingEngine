class Layer {
  constructor({
    context,
    imageSrc,
    speedModifier,
    gameSpeed,
    canvasWidth,
    canvasHeight,
  }) {
    this.x = 0;
    this.image = new Image();
    this.image.src = imageSrc;
    this.speed = Math.floor(speedModifier * gameSpeed);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.k = this.image.width / canvasWidth - 1;
    this.context = context;
    this.isInitCalled = false;
  }
  async init() {
    await this.image.decode();
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

    if (-this.x > this.k * this.canvasWidth) {
      this.context.drawImage(this.image, this.x + this.image.width, 0);
    }
    this.context.drawImage(this.image, this.x, 0);
  }
}

export default Layer;
