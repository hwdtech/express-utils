const LoggerBuilder = require('../lib/LoggerBuilder');
const LoggerFactory = require('../lib/LoggerFactory');

module.exports = function createDefaultLogger(name, path) {
  const streamConfigurations = [
    {
      type: path,
      level: 'info',
      file: path,
    },
    {
      level: 'debug',
      type: 'console',
    },
  ];

  const logger = (new LoggerBuilder()).name(name).addStreams(streamConfigurations).build();
  const factory = new LoggerFactory(logger);

  factory.turnOnNativeLogRotation();

  return factory;
};
