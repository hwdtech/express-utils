const assert = require('assert');
const ConfigurationBuilder = require('../lib/ConfigBuilder');

function createDefaultConfig(path, requiredFields) {
  return new ConfigurationBuilder()
    .fromFile(path)
    .fromArgs()
    .fromEnv()
    .setRequiredFields(requiredFields)
    .build();
}

const config = createDefaultConfig(`${__dirname}/config.json`);

assert.equal(config.get('foo'), 'bar');
assert.equal(config.get('nested:property'), 'value');
