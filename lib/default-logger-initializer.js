const LoggerBuilder = require('./LoggerBuilder');
const LogStreamFactory = require('./LogStreamFactory');

module.exports = function createDefaultLogger(name, path) {
  const streams = LogStreamFactory.createFromConfigurations([
    {
      type: path,
      level: 'info',
      file: path,
    },
    {
      level: 'debug',
      type: 'console',
    },
  ]);

  return LoggerBuilder.create().name(name).addStreams(streams).build();
};
