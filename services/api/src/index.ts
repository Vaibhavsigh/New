import dotenv from 'dotenv';

import app from './app';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import logger from './config/logger';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
  try {
    await connectDatabase();
    logger.info('Database connected successfully');

    await connectRedis();
    logger.info('Redis connected successfully');

    app.listen(PORT, () => {
      logger.info(`API server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
