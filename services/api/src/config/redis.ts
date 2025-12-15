import { createClient, RedisClientType } from 'redis';

import logger from './logger';

let redisClient: RedisClientType | null = null;

export async function connectRedis(): Promise<RedisClientType> {
  if (redisClient) {
    return redisClient;
  }

  const host = process.env.REDIS_HOST || 'localhost';
  const port = Number(process.env.REDIS_PORT) || 6379;
  const password = process.env.REDIS_PASSWORD || undefined;

  redisClient = createClient({
    socket: {
      host,
      port,
    },
    password,
  });

  redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err);
  });

  await redisClient.connect();
  logger.info(`Connected to Redis at ${host}:${port}`);

  return redisClient;
}

export function getRedisClient(): RedisClientType {
  if (!redisClient) {
    throw new Error('Redis client not connected');
  }
  return redisClient;
}

export async function closeRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    logger.info('Redis connection closed');
  }
}
