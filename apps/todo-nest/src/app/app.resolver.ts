import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import {
  PUB_SUB_INSTANCE,
  SERVER_STATISTICS_CHANGED,
  Top,
} from '@shared';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class AppResolver {
  constructor(
    @Inject(PUB_SUB_INSTANCE) private readonly pubsub: PubSub,
  ) {}

  @Subscription(() => Top)
  top() {
    return this.pubsub.asyncIterableIterator(
      SERVER_STATISTICS_CHANGED,
    );
  }

  // @ResolveField(() => Float)
  // memory(@Args('unit', { type: () => Unit }) unit: Unit) {}
}
