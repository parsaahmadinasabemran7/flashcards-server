const mongoose = require('mongoose');
const logger = require('../logger');
const { ENV } = require('./env');

async function connectDatabase() {
    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(ENV.MONGO_URI, {
            autoIndex: false
        });

        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error({ error }, 'Failed to connect to MongoDB');
        process.exit(1);
    }
}

module.exports = {
    connectDatabase
};