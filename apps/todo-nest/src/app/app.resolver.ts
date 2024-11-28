import { Inject } from '@nestjs/common';
import {
  Args,
  Float,
  Int,
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

@Resolver(() => Top)
export class AppResolver {
  constructor(
    @Inject(PUB_SUB_INSTANCE)
    private readonly redisPubSub: RedisPubSub,
  ) {}

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
    @Parent() payload: CronTopPayload,
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
      return convertor.convert(payload.top.memory);
    }
    return payload.top.memory;
  }

  @ResolveField(() => Int)
  cpu(
    @Parent() payload: CronTopPayload,
    @Args('cpuState', { type: () => CpuState }) cpuState: CpuState,
  ) {
    return cpuState === CpuState.FREE
      ? payload.top.freeCpu
      : payload.top.inUseCpu;
  }
}
