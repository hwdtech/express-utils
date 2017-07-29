class Config {
  constructor(config) {
    this.config = config;
  }

  get(path) {
    return this.config.get(path);
  }
}

module.exports = Config;
