const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter
 * Applies to all routes by default
 */
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window per IP
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Strict limiter for auth-related routes
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // tighter limit for login/register
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    generalLimiter,
    authLimiter
};