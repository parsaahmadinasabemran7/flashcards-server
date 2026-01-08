const pino = require('pino');
const { ENV } = require('../config/env');

const logger = pino({
    level: ENV.NODE_ENV === 'production' ? 'info' : 'debug',
    redact: {
        paths: [
            'req.headers.authorization',
            'req.headers.cookie'
        ],
        remove: true
    }
});

module.exports = logger;