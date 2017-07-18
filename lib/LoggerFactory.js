class LoggerFactory {
  constructor(rootLogger) {
    this.rootLogger = rootLogger;

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

  turnOnNativeLogRotation(signal = 'SIGUSR2') {
    process.on(signal, this.refreshHandler);
  }

  eachLogger(fn) {
    Object.keys(this.childLoggers).forEach(loggerName => fn(this.getLogger(loggerName)));
  }

  createExpressMiddleware(opts) {
    return this.rootLogger.createExpressMiddleware(opts);
  }
}

module.exports = LoggerFactory;
