// import dotenv from 'dotenv';
// dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS ? Number(process.env.RATE_LIMIT_WINDOW_MS) : 15 * 60 * 1000,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX ? Number(process.env.RATE_LIMIT_MAX) : 100,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};
