const winston = require('winston');

const transports = winston.transports;
const format = winston.format;

module.exports = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    process.env.NODE_ENV === 'production'
    ? new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.json())
    })
    : new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })

  ]
});
