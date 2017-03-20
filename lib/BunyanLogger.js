const bunyan = require('bunyan');
const createLogMiddleware = require('express-bunyan-logger');

class BunyanLogger {
  constructor(opts) {
    this.rootLogger = bunyan.createLogger(opts);

    this.childLoggers = {};
  }

  create(name) {
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

  // attach to sigint for logrotation
}

module.exports = BunyanLogger;
