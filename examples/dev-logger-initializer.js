const LoggerBuilder = require('../lib/logging/BunyanBuilder');
const Logger = require('../lib/logging/Logger');
const LoggerFactory = require('../lib/logging/LoggerFactory');

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

  const bunyanLogger = (new LoggerBuilder()).name(name).addStreams(streamConfigurations).build();
  const appLogger = new Logger(bunyanLogger);
  const factory = new LoggerFactory(appLogger);

  factory.turnOnNativeLogRotation();

  return factory;
};
