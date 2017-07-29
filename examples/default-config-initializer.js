const ConfigurationBuilder = require('../lib/configuration/NconfBuilder');
const Config = require('../lib/configuration/Config');

module.exports = function createDefaultConfig(path, requiredFields) {
  const nconfInstance = new ConfigurationBuilder()
    .fromFile(path)
    .useArgs()
    .fromEnv()
    .setRequiredFields(requiredFields)
    .build();

  return new Config(nconfInstance);
};
