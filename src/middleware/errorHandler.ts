const AppError = require('../errors/AppError');
const { ENV } = require('../config/env');

function errorHandler(err: Error, _req: any, res: any, _next: any) {
  if (err instanceof AppError) {
    return res.status((err as any).statusCode).json({
      error: err.message
    });
  }

  // Log internally
  console.error('❌ Unexpected error:', err);

  // Hide details in production
  const message =
    ENV.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message;

  return res.status(500).json({ error: message });
}

module.exports = errorHandler;