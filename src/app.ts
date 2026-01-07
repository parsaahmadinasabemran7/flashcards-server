const express = require('express');

const app = express();

/**
 * Security hardening
 */
app.disable('x-powered-by');

/**
 * Body parsing with strict limits
 */
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

module.exports = app;