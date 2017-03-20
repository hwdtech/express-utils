const ConfigurationBuilder = require('./ConfigurationBuilder');

module.exports = function createDefaultConfig(path, requiredFields) {
  return new ConfigurationBuilder()
    .fromFile(path)
    .useArgs()
    .fromEnv()
    .setRequiredFields(requiredFields)
    .build();
};
