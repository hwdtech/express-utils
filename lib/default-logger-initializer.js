const LoggerBuilder = require('./LoggerBuilder');
const LogStreamFactory = require('./LogStreamFactory');

module.exports = function createDefaultLogger(name, path) {
  const usePretty = process.env.NODE_ENV !== 'production';

  let buildResult = new LoggerBuilder()
    .name(name)
    .addStream(LogStreamFactory.createFileStream('debug', path));

  if (usePretty) {
    buildResult = buildResult.addStream(LogStreamFactory.createPrettyStdoutStream('debug'));
  }

  return buildResult.build();
};
