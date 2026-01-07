const dotenv = require('dotenv');

dotenv.config();

const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'MONGO_URI',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET'
] as const;

type RequiredEnv = (typeof requiredEnvVars)[number];

function validateEnv(): Record<RequiredEnv, string> {
    const env: Partial<Record<RequiredEnv, string>> = {};

    for (const key of requiredEnvVars) {
        const value = process.env[key];

        if (!value) {
            console.error(`Missing required environment variable: ${key}`);
            process.exit(1);
        }

        env[key] = value;
    }

    return env as Record<RequiredEnv, string>;
}

const ENV = validateEnv();

module.exports = {
    ENV
};