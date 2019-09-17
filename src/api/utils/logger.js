import winston from 'winston';

const date = new Date().toISOString();

const consoleTransport = new winston.transports.Console({
  format: winston.format.simple(),
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: `logs/${date}-error.log`, level: 'error' }),
    new winston.transports.File({ filename: `logs/${date}-info.log`, level: 'info' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(consoleTransport);
}

export default logger;
