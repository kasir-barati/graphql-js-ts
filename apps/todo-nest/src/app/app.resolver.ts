import { Inject } from '@nestjs/common';
import {
  Args,
  Float,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import {
  CpuState,
  CRON_JOB_OF_SERVER_STATISTICS,
  CronTopPayload,
  GigabyteConvertor,
  KilobyteConvertor,
  MegabyteConvertor,
  MemoryUnitConvertor,
  PUB_SUB_INSTANCE,
  SERVER_STATISTICS_CHANGED,
  Top,
  Unit,
} from '@shared';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { TestInput } from './inputs';

@Resolver(() => Top)
export class AppResolver {
  constructor(
    @Inject(PUB_SUB_INSTANCE)
    private readonly redisPubSub: RedisPubSub,
  ) {}

  @Mutation(() => Boolean)
  test(@Args('input') input: TestInput) {
    console.log(input);

    return true;
  }

  @Subscription(() => String)
  async *greet() {
    for await (const word of [
      'سلام',
      'Hi',
      'Hallo',
      'Grüß Gott',
      'Moin',
      'Ciao',
      'こにちは',
    ]) {
      yield { greet: word };
    }
  }

  @Subscription(() => Top)
  top() {
    this.redisPubSub.publish<boolean>(
      CRON_JOB_OF_SERVER_STATISTICS,
      true,
    );
    // Payload should be { top: { cpu: 12 } }
    // FIXME: https://github.com/davidyaha/graphql-redis-subscriptions/pull/636
    return this.redisPubSub.asyncIterator(SERVER_STATISTICS_CHANGED);
  }

  @ResolveField(() => Float)
  memory(
    @Parent() payload: CronTopPayload['top'],
    @Args('unit', { type: () => Unit }) unit: Unit,
  ) {
    const unitToConvertorMap: Record<Unit, MemoryUnitConvertor> = {
      [Unit.BYTE]: undefined,
      [Unit.KILOBYTE]: new KilobyteConvertor(),
      [Unit.MEGABYTE]: new MegabyteConvertor(),
      [Unit.GIGABYTE]: new GigabyteConvertor(),
    };
    const convertor: MemoryUnitConvertor | undefined =
      unitToConvertorMap[unit];

    if (convertor) {
      return convertor.convert(payload.memory);
    }

    return payload.memory;
  }

  @ResolveField(() => Int)
  cpu(
    // Note that here the top-level key does not exist anymore
    // It is I guess handled by NestJS.
    @Parent() payload: CronTopPayload['top'],
    @Args('cpuState', { type: () => CpuState }) cpuState: CpuState,
  ) {
    return cpuState === CpuState.FREE
      ? payload.freeCpu
      : payload.inUseCpu;
  }
}
