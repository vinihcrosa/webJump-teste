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
  fatal(context:string, message: string, data: any, ...args: any[]): void {
    this.logger.fatal({
      context,
      message,
      data,
      args
    }, message);
  }
  error(context:string, message: string, data: any, ...args: any[]): void {
    this.logger.error({
      context,
      message,
      data,
      args
    }, message);
  }
  warn(context:string, message: string, data: any, ...args: any[]): void {
    this.logger.warn({
      context,
      message,
      data,
      args
    }, message);
  }

  info(context:string, message: string, data: any, ...args: any[]): void {
    this.logger.info({
      context,
      message,
      data,
      args
    }, message);
  }

  debug(context:string, message: string, data: any, ...args: any[]): void {
    this.logger.debug({
      context,
      message,
      data,
      args
    }, message);
  }

  trace(context:string, message: string, data: any, ...args: any[]): void {
    this.logger.trace({
      context,
      message,
      data,
      args
    }, message);
  }
}