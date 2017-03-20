const path = require('path');
const nconf = require('nconf');

class ConfigurationBuilder {
  constructor(Provider) {
    this.Provider = Provider || nconf.Provider;

    this.config = new this.Provider();
  }

  fromEnv() {
    this.config.env();

    return this;
  }

  fromFile(filePath) {
    this.config.file(this.resolveFormat(filePath));

    return this;
  }

  useArgs() {
    this.config.argv();
  }

  override(overrides) {
    this.config.override(overrides);

    return this;
  }

  setRequiredFields(fields) {
    this.config.required(fields);

    return this;
  }

  build() {
    return this.config;
  }

  resolveFormat(file) {
    const ext = path.extname(file);
    const options = { file };

    if (ext === 'yaml' || ext === 'yml') {
      options.format = require('nconf-yaml');
    }

    // ini and json handled by nconf itself

    return options;
  }
}

module.exports = ConfigurationBuilder;
