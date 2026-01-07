const cors = require('cors');
const { ENV } = require('../config/env');

/**
 * Allowed origins should be explicit and environment-specific.
 * Comma-separated list is supported for flexibility.
 */
const allowedOrigins = ENV.NODE_ENV === 'production'
    ? (process.env.CORS_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean)
    : ['http://localhost:5173']

const corsOptions = {
    origin: function (origin: string | undefined, callback: Function) {
        // Allow non-browser requests (e.g. curl, health checks)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600
};

module.exports = cors(corsOptions);