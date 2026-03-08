import { Redis } from 'ioredis';

export const connectToRedis = async () => {
  const { REDIS_HOST, REDIS_PORT } = process.env;
  const redis = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  });
  if (!redis) throw new Error('Failed to connect to Redis');
  console.log('Connected to Redis', REDIS_HOST, REDIS_PORT);
  return redis;
};
