const assert = require('assert');
const ConfigurationBuilder = require('../lib/configuration/NconfBuilder');
const Config = require('../lib/configuration/Config');

function createDefaultConfig(path, requiredFields) {
  const nconfInstance = new ConfigurationBuilder()
    .fromFile(path)
    .useArgs()
    .fromEnv()
    .setRequiredFields(requiredFields)
    .build();

  return new Config(nconfInstance);
}

const config = createDefaultConfig(__dirname + '/config.json');

assert.equal(config.get('foo'), 'bar');
assert.equal(config.get('nested:property'), 'value');
