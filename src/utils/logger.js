import winston from 'winston';
import config from '../config';

const date = new Date().toISOString();

const consoleTransport = new winston.transports.Console({
  format: winston.format.simple(),
});

const fileTransports = [
  new winston.transports.File({ filename: `logs/${date}-error.log`, level: 'error' }),
  new winston.transports.File({ filename: `logs/${date}-info.log`, level: 'info' }),
];

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
});

if (config.ENABLE_CONSOLE_LOG) logger.add(consoleTransport);
if (config.ENABLE_LOG_FILE) fileTransports.forEach(logger.add);

export default logger;
