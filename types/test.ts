import { ConfigBuilder, LoggerBuilder, LoggerFactory, StreamType, LogLevel, Logger } from 'express-utils';

// $ExpectType Config
new ConfigBuilder()
  .fromArgs()
  .fromFile('test')
  .fromEnv()
  .setRequiredFields(['foo'])
  .build();

// $ExpectError
const type: StreamType = 'some-type';

// $ExpectError
const level: LogLevel = 'my-level';

// $ExpectType Logger
new LoggerBuilder()
  .name('cool')
  .addStream({
    type: 'stream',
    level: 'trace',
    stream: process.stdout
  })
  .addSerializer('req', () => {})
  .build();

const root = {
  trace() {},
  debug() {},
  info() {},
  warn() {},
  error() {},
  fatal() {},
  child() {
    return root;
  },
  reopenFileStreams() {}
};
const loggerFactory = new LoggerFactory(root);

// $ExpectType Logger
loggerFactory.getLogger('foo');

// $ExpectType void
loggerFactory.turnOnNativeLogRotation();
