export interface ILogger {
  fatal(context:string, message: string, data: any, ...args: any[]): void;
  error(context:string, message: string, data: any, ...args: any[]): void;
  warn(context:string, message: string, data: any, ...args: any[]): void;
  info(context:string, message: string, data: any, ...args: any[]): void;
  debug(context:string, message: string, data: any, ...args: any[]): void;
  trace(context:string, message: string, data: any, ...args: any[]): void; 
}