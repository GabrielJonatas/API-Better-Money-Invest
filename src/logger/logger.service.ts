import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LogService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.log(message);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message);
  }
}
