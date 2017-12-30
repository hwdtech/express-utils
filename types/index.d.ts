import { Writable } from 'stream';

export interface Config {
  get(prop: string): any
}

export interface Logger {
  trace(...params: any[]): void;
  debug(...params: any[]): void;
  info(...params: any[]): void;
  warn(...params: any[]): void;
  error(...params: any[]): void;
  fatal(...params: any[]): void;
  child(opts?: Object): Logger;
  reopenFileStreams(): void;
}

export class ConfigBuilder {
  fromEnv(): ConfigBuilder;
  fromFile(file: string): ConfigBuilder;
  fromArgs(): ConfigBuilder;
  setRequiredFields(keys: string[]): ConfigBuilder;
  build(): Config
}

export type StreamType = 'raw' | 'file' | 'pretty';
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

export interface StreamConfiguration {
  type: StreamType,
  level: LogLevel,
  stream?: Writable,
  path?: string
}

export class LoggerBuilder {
  name(n: string): LoggerBuilder;
  addStream(config: StreamConfiguration): LoggerBuilder;
  addStreams(configs: StreamConfiguration[]): LoggerBuilder;
  addSerializer(name: string, serializer: Function): LoggerBuilder;
  build(): Logger;
}

export class LoggerFactory {
  constructor(logger: Logger);
  getLogger(name: string): Logger;
  turnOnNativeLogRotation(signal?: string): void;

  private eachLogger(): void
}
