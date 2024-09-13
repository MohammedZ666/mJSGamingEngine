class Sprite {
  constructor({
    context,
    gameFrame,
    x,
    y,
    scale,
    imageSrc,
    spritesInImage,
    spriteRow,
    animationSpeed,
    canvasWidth,
    canvasHeight,
  }) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.spriteRow = spriteRow;
    this.spritesInImage = spritesInImage;
    this.scale = scale;
    this.spriteState = 0;
    this.speed = Math.random() * 4 - 2;
    this.animationSpeed = animationSpeed;
    this.x = 250;
    this.y = 350;
    this.isInitCalled = false;
    this.context = context;
    this.gameFrame = gameFrame;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
  async init() {
    let temp = await this.image.decode();
    this.spriteWidth = Math.floor(this.image.width / this.spritesInImage);
    this.spriteHeight = this.image.height;
    this.width = Math.round(this.spriteWidth * this.scale);
    this.height = Math.round(this.spriteHeight * this.scale);
    this.isInitCalled = true;
  }

  update() {
    if (!this.isInitCalled)
      throw Error("Please call the init() method before calling update().");

    if (this.x % (this.canvasWidth0 - this.width)) this.speed = -this.speed;
    if (this.y % (this.canvasHeight - this.height)) this.speed = -this.speed;
    this.x = this.x + Math.round(this.speed + Math.random() * 5 - 2.5);
    this.y = this.y + Math.round(this.speed + Math.random() * 5 - 2.5);
  }
  draw() {
    if (!this.isInitCalled)
      throw Error("Please call the init() method before calling draw().");

    this.context.drawImage(
      this.image,
      this.spriteState * this.spriteWidth,
      this.spriteRow,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.gameFrame % this.animationSpeed == 0) {
      this.spriteState = (this.spriteState + 1) % 3;
    }
  }
}

export default Sprite;
