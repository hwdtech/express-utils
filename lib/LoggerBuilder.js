const fs = require('fs');
const { dirname } = require('path');
const assert = require('assert');
const bunyan = require('bunyan');
const bunyanDebugStream = require('bunyan-debug-stream');

module.exports = class LoggerBuilder {
  static get TYPES() {
    return {
      file: 'file',
      raw: 'raw',
      console: 'pretty',
      stream: 'stream'
    };
  }

  constructor() {
    this.opts = {
      streams: []
    };
  }

  name(component) {
    this.opts.name = component;
    return this;
  }

  addStream(streamConfiguration) {
    const stream = createFromConfiguration(streamConfiguration);
    this.opts.streams.push(stream);

    return this;
  }

  addStreams(streamConfigurations) {
    streamConfigurations.forEach(s => this.addStream(s));
    return this;
  }

  build() {
    const logger = bunyan.createLogger(this.opts);
    logger.addSerializers(bunyan.stdSerializers);

    return logger;
  }
};

function createFromConfiguration(configuration) {
  const { type, level, stream, path } = configuration;

  switch (type) {
    case 'file': {
      return createFileStream(level, path);
    }
    case 'raw': {
      return createRawStream(level, stream);
    }
    case 'stream': {
      return createStream(level, stream);
    }
    case 'pretty': {
      return createConsoleStream(level, stream);
    }
    default: {
      throw new Error(`Unknown stream configuration type: ${type}`);
    }
  }
}

function createFileStream(level, file) {
  assertStreamPath(file);
  return {
    level,
    type: 'file',
    path: file
  };
}

function createConsoleStream(level, out) {
  return createRawStream(
    level,
    bunyanDebugStream({
      out,
      forceColor: true,
      basepath: process.cwd(),
      prefixers: {
        component(logObj) {
          return logObj.name;
        }
      }
    })
  );
}

function createRawStream(level, stream) {
  return {
    level,
    type: 'raw',
    stream
  };
}

function createStream(level, stream) {
  return {
    level,
    stream,
    type: 'stream'
  };
}

function assertStreamPath(filePath) {
  const dir = dirname(filePath);
  assert.ok(fs.existsSync(dir), `Cannot find log directory ${dir}`);
}
