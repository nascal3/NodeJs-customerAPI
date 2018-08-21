require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const logger = require('../middleware/logger');

module.exports = function () {

    //GET UNCAUGHT ERRORS TO LOG FILE
    process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });

    //GET UNHANDLED ERRORS TO LOG FILE
    process.on('unhandledRejection', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });

    logger.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/vidly',
        level: 'error'
    }));
};