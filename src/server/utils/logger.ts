import winston from 'winston';
import env from '../config/env';

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, service }) => {
    return `[${timestamp}] ${service} ${level}: ${message}`;
  })
);

export function createLogger(service: string) {
  return winston.createLogger({
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    format,
    defaultMeta: { service },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
}

export const logger = createLogger('app');