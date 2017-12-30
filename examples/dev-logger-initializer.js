const LoggerBuilder = require('../lib/LoggerBuilder');
const LoggerFactory = require('../lib/LoggerFactory');

function createLoggerFactory(name, path) {
  const streamConfigurations = [
    {
      type: 'file',
      level: 'trace',
      path
    },
    {
      level: 'debug',
      type: 'pretty',
      stream: process.stdout
    },
    {
      level: 'error',
      type: 'pretty',
      stream: process.stderr
    }
  ];

  const bunyanLogger = new LoggerBuilder()
    .name(name)
    .addStreams(streamConfigurations)
    .build();
  const factory = new LoggerFactory(bunyanLogger);
  factory.turnOnNativeLogRotation();
  return factory;
}

const loggerFactory = createLoggerFactory('my-logger', `${__dirname}/example.log`);
const logger = loggerFactory.getLogger('my-logger:child');

logger.fatal(new Error('no way'));
logger.error(new Error('I can handle that'));
logger.warn("You better don't do this again");
logger.info("I'm working here");
logger.debug('Look at this');
logger.trace('Never mind');
