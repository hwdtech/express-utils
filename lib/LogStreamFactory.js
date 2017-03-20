const fs = require('fs');
const path = require('path');
const assert = require('assert');
const bunyanDebugStream = require('bunyan-debug-stream');

class LogStreamFactory {
  static createFileStream(level, filePath) {
    LogStreamFactory.assertStreamPath(filePath);
    return {
      level,
      file: filePath,
    };
  }

  static createStdoutStream(level) {
    return {
      level,
      stream: process.stdout,
    };
  }

  static createPrettyStdoutStream(level, projectRootDir) {
    return this.createRawStream(
      level,
      bunyanDebugStream({
        forceColor: true,
        basepath: projectRootDir || process.cwd(),
      }),
    );
  }

  static createRawStream(level, stream) {
    return {
      level,
      type: 'raw',
      stream,
    };
  }

  static assertStreamPath(filePath) {
    const dir = path.dirname(filePath);
    assert.ok(fs.existsSync(dir), `Cannot find log directory ${dir}`);
  }
}

module.exports = LogStreamFactory;
