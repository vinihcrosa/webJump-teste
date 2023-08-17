import pino from 'pino';
import { ILogger } from '../ILogger';

export default class PinoLogger implements ILogger{
  private logger: pino.Logger;

  constructor() {
    this.logger = pino({
      enabled: true,
      level: 'debug',
      prettyPrint: {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname'
      }
    });
  }
  fatal(message: string, ...args: any[]): void {
    this.fatal(message, ...args);
  }
  error(message: string, ...args: any[]): void {
    this.error(message, ...args);
  }
  warn(message: string, ...args: any[]): void {
    this.warn(message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.info(message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.debug(message, ...args);
  }

  trace(message: string, ...args: any[]): void {
    this.trace(message, ...args);
  }
}