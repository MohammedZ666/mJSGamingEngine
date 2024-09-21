class ParallaxBackground {
  constructor({ gameConfig, layers }) {
    this.layers = layers;
    this.isInitCalled = false;
    this.gameConfig = gameConfig;
    this.init();
  }
  async init() {
    for (let i = 0; i < this.layers.length; i++) {
      await this.layers[i].init(this.gameConfig);
    }
    this.isInitCalled = true;
  }

  draw() {
    if (this.isInitCalled) {
      this.layers.forEach((layer) => {
        layer.draw();
        layer.update();
      });
    }
  }
}

export default ParallaxBackground;
