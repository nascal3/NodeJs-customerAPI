const config = require('config');
const logger = require('../middleware/logger');

module.exports = function () {

    if (!config.get('jwtPrivateKey')) {
        logger.error('FATAL ERROR: jwtPrivateKey Iis not defined!');
        process.exit(1);
    }
};