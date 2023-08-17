import pino from 'pino';
import { ILogger } from '../ILogger';

export default class PinoLogger implements ILogger{
  private logger: pino.Logger;

  constructor() {
    const fileTransport = pino.transport({
      targets: [
        {
          target: 'pino/file',
          level: 'debug',
          options: {
            destination: `./logs/log-${Date.now()}.log`,
          }
        },
        {
          target: 'pino-pretty',
          level: 'debug',
          options: {}
        }
      ]
    })

    this.logger = pino({
      enabled: true,
      level: 'debug',
    },
    fileTransport
    );
  }
  fatal(message: string, ...args: any[]): void {
    this.logger.fatal(message, ...args);
  }
  error(message: string, ...args: any[]): void {
    this.logger.error(message, ...args);
  }
  warn(message: string, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.logger.info(message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }

  trace(message: string, ...args: any[]): void {
    this.logger.trace(message, ...args);
  }
}