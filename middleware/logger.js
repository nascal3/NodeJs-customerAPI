const winston = require('winston');
require('winston-mongodb');

module.exports = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'error' })
    ]
});