import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import {
  PUB_SUB_INSTANCE,
  SERVER_STATISTICS_CHANGED,
  Top,
} from '@shared';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Resolver()
export class AppResolver {
  constructor(
    @Inject(PUB_SUB_INSTANCE)
    private readonly redisPubSub: RedisPubSub,
  ) {}

  @Subscription(() => Top)
  top() {
    // Payload should be { top: { cpu: 12 } }
    // FIXME: https://github.com/davidyaha/graphql-redis-subscriptions/pull/636
    return this.redisPubSub.asyncIterator(SERVER_STATISTICS_CHANGED);
  }

  // @ResolveField(() => Float)
  // memory(@Args('unit', { type: () => Unit }) unit: Unit) {}
}
