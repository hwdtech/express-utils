const { join } = require('path');
const Builder = require('../lib/ConfigBuilder');

test('it should load configuration from json file', () => {
  const config = new Builder().fromFile(join(__dirname, 'config-fixture.json')).build();

  expect(config.get('foo')).toEqual('bar');
  expect(config.get('nested')).toEqual({
    property: 'value'
  });
  expect(config.get('nested:property')).toEqual('value');
});

test('it should load configuration from yml file', () => {
  const config = new Builder().fromFile(join(__dirname, 'config-fixture.yml')).build();

  expect(config.get('foo')).toEqual('bar');
  expect(config.get('nested')).toEqual({
    property: 'value'
  });
  expect(config.get('nested:property')).toEqual('value');
});

test('it should load env variables', () => {
  process.env.CONFIG_TEST = 'config-test';
  const config = new Builder().fromEnv().build();

  expect(config.get('CONFIG_TEST')).toEqual('config-test');
  delete process.env.CONFIG_TEST;
});

test('it should assert on empty required fields', () => {
  expect(() =>
    new Builder()
      .fromFile(join(__dirname, 'config-fixture.json'))
      .setRequiredFields(['baz'])
      .build()
  ).toThrow();
});
