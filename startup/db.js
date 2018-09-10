const mongoose = require('mongoose');
const logger = require('../middleware/logger');
const config = require('config');

module.exports = function () {

    mongoose.connect(config.get('db'))
        .then(() => logger.info(`Connection to ${config.get('db')} established...`));
};