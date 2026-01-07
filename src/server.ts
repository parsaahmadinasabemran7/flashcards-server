const http = require('http');
const app = require('./app');
const { ENV } = require('./config/env');

const PORT = Number(ENV.PORT);

if (Number.isNaN(PORT)) {
    console.error('PORT environment variable must be a valid number');
    process.exit(1);
}

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/**
 * Fail fast on expected errors
 */
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});