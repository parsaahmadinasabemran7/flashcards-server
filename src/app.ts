const express = require('express');

const helmetMiddleware = require('./middleware/helmet');
const corsMiddleware = require('./middleware/cors');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/**
 * Security hardening
 */
app.disable('x-powered-by');

/**
 * Global security middleware
 */
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(generalLimiter);

/**
 * Body parsing
 */
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

/**
 * Error handling (must be last)
 */
app.use(errorHandler);

module.exports = app;