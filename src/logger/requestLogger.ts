const crypto = require('crypto');
const logger = require('../logger');

function requestLogger(req: any, res: any, next: any) {
    const requestId = crypto.randomUUID();

    req.id = requestId;
    res.setHeader('X-Request-Id', requestId);

    const startTime = Date.now();

    logger.info({
        requestId,
        method: req.method,
        url: req.originalUrl
    }, 'Incoming request');

    res.on('finish', () => {
        const durationMs = Date.now() - startTime;

        logger.info({
            requestId,
            statusCode: res.statusCode,
            durationMs
        }, 'Request completed');
    });

    next();
}

module.exports = requestLogger;