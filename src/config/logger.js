import winston from 'winston';
import config from './config.js';

const customLevelsOptions = {
  levels: {
    fatal: 1,
    error: 0,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'blue',
    debug: 'white',
  },
};

const transports = [
  new winston.transports.Console({
    level: config.ENV === 'prod' ? 'info' : 'debug',
    format: winston.format.combine(
      winston.format.colorize({ colors: customLevelsOptions.colors }),
      winston.format.simple(),
    ),
  }),
];

if (config.ENV === 'prod') {
  transports.push(
    new winston.transports.File({
      filename: './errors.log',
      level: 'error',
      format: winston.format.json(),
    })
  );
}

const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports,
});

export default logger;
