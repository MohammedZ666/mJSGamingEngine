class SpriteArray {
  constructor({ sprites, gameConfig }) {
    this.sprites = sprites;
    this.isInitCalled = false;
    this.gameConfig = gameConfig;
    this.init();
  }
  async init() {
    for (let i = 0; i < this.sprites.length; i++) {
      await this.sprites[i].init(this.gameConfig);
    }
    this.isInitCalled = true;
  }

  draw() {
    if (this.isInitCalled) {
      this.sprites.forEach((sprite) => {
        sprite.draw();
        sprite.update();
      });
    }
  }
}
export default SpriteArray;
