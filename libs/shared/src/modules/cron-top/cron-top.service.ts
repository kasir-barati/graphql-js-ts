import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import {
  CRON_JOB_OF_SERVER_STATISTICS,
  SERVER_STATISTICS_CHANGED,
} from '../../constants/trigger-name.constant';
import { CronTopPayload } from '../../types/cron-top-payload.type';
import { getCpuPercentage } from '../../utils/get-cpu-percentage.util';
import { getMemoryUsage } from '../../utils/get-memory-usage.utils';
import { PUB_SUB_INSTANCE } from '../pubsub/pubsub.constant';

@Injectable()
export class CronTopService implements OnModuleInit {
  private _cpuJob: CronJob<null, null>;

  public get cpuJob() {
    return this._cpuJob;
  }

  constructor(
    @Inject(PUB_SUB_INSTANCE)
    private readonly redisPubSub: RedisPubSub,
  ) {
    this._cpuJob = CronJob.from({
      start: true,
      cronTime: '*/5 * * * * *',
      onTick: async () => {
        const freeCpu = await getCpuPercentage('free');
        const inUseCpu = await getCpuPercentage('in-use');
        const memory = getMemoryUsage().usedMemory;

        this.redisPubSub.publish(SERVER_STATISTICS_CHANGED, {
          top: {
            cpu: 0,
            memory: memory,
            freeCpu,
            inUseCpu,
          },
        } satisfies CronTopPayload);
      },
      timeZone: 'utc',
    });
  }

  async onModuleInit() {
    await this.redisPubSub.subscribe(
      CRON_JOB_OF_SERVER_STATISTICS,
      (start: boolean) => {
        if (start) {
          this._cpuJob.start();
          return;
        }
        this._cpuJob.stop();
      },
    );
  }
}
