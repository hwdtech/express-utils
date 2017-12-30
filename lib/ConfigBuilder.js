const path = require('path');
const nconf = require('nconf');

module.exports = class ConfigBuilder {
  constructor() {
    this.config = new nconf.Provider();
  }

  fromEnv() {
    this.config.env();
    return this;
  }

  fromFile(filePath) {
    this.config.file(this.resolveFormat(filePath));
    return this;
  }

  fromArgs() {
    this.config.argv();
    return this;
  }

  override(overrides) {
    this.config.override(overrides);
    return this;
  }

  setRequiredFields(fields = []) {
    this.config.required(fields);
    return this;
  }

  build() {
    return this.config;
  }

  resolveFormat(file) {
    const ext = path.extname(file);
    const options = { file };

    if (ext === '.yaml' || ext === '.yml') {
      options.format = require('nconf-yaml');
    }

    // ini and json handled by nconf itself

    return options;
  }
};
