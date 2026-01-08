const express = require('express');

const helmetMiddleware = require('./middleware/helmet');
const corsMiddleware = require('./middleware/cors');
const requestLogger = require('./middleware/requestLogger');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.disable('x-powered-by');

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(requestLogger);
app.use(generalLimiter);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

app.use(errorHandler);

module.exports = app;