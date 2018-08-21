const mongoose = require('mongoose');
const logger = require('../middleware/logger');

module.exports = function () {

    mongoose.connect('mongodb://localhost/vidly')
        .then(() => logger.info('Connection to DB established...'))
};