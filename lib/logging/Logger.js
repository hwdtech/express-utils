class Logger {
  constructor(logger) {
    this.bunyan = logger;
  }

  trace(...params) {
    return this.bunyan.trace(...params);
  }

  debug(...params) {
    return this.bunyan.debug(...params);
  }

  info(...params) {
    return this.bunyan.info(...params);
  }

  warn(...params) {
    return this.bunyan.warn(...params);
  }

  error(...params) {
    return this.bunyan.error(...params);
  }

  fatal(...params) {
    return this.bunyan.fatal(...params);
  }

  child(...params) {
    return new Logger(this.bunyan.child(...params));
  }

  reopenFileStreams(...params) {
    return this.bunyan.reopenFileStreams(...params);
  }
}

module.exports = Logger;
