class Sprite {
  constructor({
    x,
    y,
    scale,
    imageSrc,
    spritesInImage,
    spriteRow,
    animationSpeed,
  }) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.spriteRow = spriteRow;
    this.spritesInImage = spritesInImage;
    this.scale = scale;
    this.spriteState = 0;
    this.speed = Math.random() * 4 - 2;
    this.animationSpeed = animationSpeed;
    this.x = x;
    this.y = y;
    this.isInitCalled = false;
  }
  async init(gameConfig) {
    await this.image.decode();
    this.gameConfig = gameConfig;
    this.context = this.gameConfig.context;
    this.canvasWidth = this.gameConfig.canvasWidth;
    this.canvasHeight = this.gameConfig.canvasHeight;
    this.spriteWidth = Math.floor(this.image.width / this.spritesInImage);
    this.spriteHeight = this.image.height;
    this.width = Math.round(this.spriteWidth * this.scale);
    this.height = Math.round(this.spriteHeight * this.scale);
    this.isInitCalled = true;
    this.newX = this.x;
    this.newY = this.y;
  }

  update() {
    if (!this.isInitCalled)
      throw Error("Please call the init() method before calling update().");

    // if (this.x % (this.canvasWidth - this.width)) this.speed = -this.speed;
    // if (this.y % (this.canvasHeight - this.height)) this.speed = -this.speed;
    // this.x = this.x + Math.round(this.speed + Math.random() * 5 - 2.5);
    // this.y = this.y + Math.round(this.speed + Math.random() * 5 - 2.5);
    if (this.newX > this.x) {
      if (this.newX >= this.x + this.speed) this.x = this.x + this.speed;
      else this.x = this.x + 1;
    }
    if (this.newX < this.x) {
      if (this.newX <= this.x - this.speed) this.x = this.x - this.speed;
      else this.x = this.x - 1;
    }
  }

  setNewPosition({ newX, newY, baselineX, baselineY }) {
    if (typeof baselineX === "undefined") baselineX = this.canvasWidth;
    if (typeof baselineY === "undefined") baselineY = this.canvasHeight;

    if (newX < 0) this.newX = 0;
    else if (newX > baselineX - this.spriteWidth)
      this.newX = baselineX - this.spriteWidth;
    else this.newX = newX;

    if (newY < 0) this.newY = 0;
    else if (newY > baselineY - this.spriteHeight)
      this.newY = baselineY - this.spriteHeight;
    else this.newY = newY;
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
    if (this.gameConfig.gameFrame % this.animationSpeed == 0) {
      this.spriteState = (this.spriteState + 1) % this.spritesInImage;
    }
  }
}

export default Sprite;
