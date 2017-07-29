const LoggerBuilder = require('../lib/logging/BunyanBuilder');
const Logger = require('../lib/logging/Logger');
const LoggerFactory = require('../lib/logging/LoggerFactory');

function createLoggerFactory(name, path) {
  const streamConfigurations = [
    {
      type: 'file',
      level: 'info',
      path
    },
    {
      level: 'debug',
      type: 'console'
    }
  ];

  const bunyanLogger = new LoggerBuilder()
    .name(name)
    .addStreams(streamConfigurations)
    .build();
  const appLogger = new Logger(bunyanLogger);
  const factory = new LoggerFactory(appLogger);

  factory.turnOnNativeLogRotation();

  return factory;
}

const loggerFactory = createLoggerFactory(
  'my-logger',
  `${__dirname}/example.log`
);
const logger = loggerFactory.getLogger('my-logger:child');

logger.fatal(new Error('no way'));
logger.error(new Error('I can handle that'));
logger.warn("You better don't do this again");
logger.info("I'm working here");
logger.debug('Look at this');
logger.trace('Never mind');
