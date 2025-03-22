import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';

import { PUB_SUB_INSTANCE } from '../pubsub.constant';

export const redisPubSubFactory: FactoryProvider<RedisPubSub> = {
  provide: PUB_SUB_INSTANCE,
  useFactory(configService: ConfigService) {
    const options: RedisOptions = configService.getOrThrow(
      'pubSubRedisConfigs',
    );

    return new RedisPubSub({
      subscriber: new Redis(options),
      publisher: new Redis(options),
    });
  },
  inject: [ConfigService],
};
