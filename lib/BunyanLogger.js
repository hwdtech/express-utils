const bunyan = require('bunyan');
const createLogMiddleware = require('express-bunyan-logger');

class BunyanLogger {
  constructor(opts) {
    this.rootLogger = bunyan.createLogger(opts);
    this.rootLogger.addSerializers(bunyan.stdSerializers);

    this.childLoggers = {};

    this.refreshHandler = () => {
      this.rootLogger.reopenFileStreams();
      this.eachLogger(logger => logger.reopenFileStreams());
    };
  }

  getLogger(name) {
    if (!this.childLoggers[name]) {
      this.childLoggers[name] = this.rootLogger.child({ component: name });
    }

    return this.childLoggers[name];
  }

  createLogMiddleware(opts) {
    return createLogMiddleware(
      Object.assign(
        {
          logger: this.rootLogger,
        },
        opts,
      ),
    );
  }

  turnOnNativeLogRotation(signal = 'SIGUSR2') {
    process.on(signal, this.refreshHandler);
  }

  eachLogger(fn) {
    Object.keys(this.childLoggers).forEach(loggerName => fn(this.getLogger(loggerName)));
  }
}

module.exports = BunyanLogger;
