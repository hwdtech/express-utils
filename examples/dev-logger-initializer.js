const LoggerBuilder = require('../lib/LoggerBuilder');

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

  return LoggerBuilder.create().name(name).addStreams(streamConfigurations).build();
};
