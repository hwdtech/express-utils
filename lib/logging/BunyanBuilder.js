const fs = require('fs');
const { dirname } = require('path');
const assert = require('assert');
const bunyan = require('bunyan');
const bunyanDebugStream = require('bunyan-debug-stream');

module.exports = BunyanBuilder;

class BunyanBuilder {
  constructor() {
    this.opts = {
      src: true,
      streams: [],
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

  addSerializer(name, serializer) {
    this.opts.serializers = Object.assign(this.opts.serializers || {}, {
      [name]: serializer,
    });

    return this;
  }

  build() {
    const logger = bunyan.createLogger(this.opts);
    logger.addSerializers(bunyan.stdSerializers);

    return logger;
  }
}

function createFromConfiguration(configuration) {
  const { type, level, stream, path } = configuration;

  switch (type) {
    case 'file': {
      return createFileStream(level, path);
    }
    case 'raw': {
      return createRawStream(level, stream);
    }
    case 'console': {
      return createConsoleStream(level, path);
    }
    case 'stderr': {
      return createRawStream(level, process.stderr);
    }
    case 'stdout': {
      return createRawStream(level, process.stdout);
    }
    default: {
      return createRawStream(level, process.stdout);
    }
  }
}

function createFileStream(level, file) {
  assertStreamPath(file);
  return {
    level,
    file,
  };
}

function createConsoleStream(level, projectRootDir) {
  return createRawStream(
    level,
    bunyanDebugStream({
      forceColor: true,
      basepath: projectRootDir || process.cwd(),
    }),
  );
}

function createRawStream(level, stream) {
  return {
    level,
    type: 'raw',
    stream,
  };
}

function assertStreamPath(filePath) {
  const dir = dirname(filePath);
  assert.ok(fs.existsSync(dir), `Cannot find log directory ${dir}`);
}
