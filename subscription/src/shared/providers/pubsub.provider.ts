import { FactoryProvider } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PUBSUB_PROVIDER = Symbol('pubsub');

export const pubsubProvider: FactoryProvider<RedisPubSub> = {
  provide: PUBSUB_PROVIDER,
  useFactory() {
    const pubsub = new RedisPubSub();

    return pubsub;
  },
};
