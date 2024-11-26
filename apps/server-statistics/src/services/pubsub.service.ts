import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { getEnv } from '../utils/env.util';

let redisPubSub: RedisPubSub;

export function getRedisPubSub() {
  if (!redisPubSub) {
    const { redis } = getEnv();
    const options = {
      host: redis.host,
      port: redis.port,
      password: redis.password,
    };

    redisPubSub = new RedisPubSub({
      subscriber: new Redis(options),
      publisher: new Redis(options),
    });
  }

  return redisPubSub;
}
