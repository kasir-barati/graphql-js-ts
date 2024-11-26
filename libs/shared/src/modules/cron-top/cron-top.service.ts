import { Inject, Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { PubSub } from 'graphql-subscriptions';
import { SERVER_STATISTICS_CHANGED } from '../../constants/trigger-name.constant';
import { Top } from '../../models/top.model';
import { getCpuInfo } from '../../utils/get-cpu-info.util';
import { PUB_SUB_INSTANCE } from '../pubsub/pubsub.constant';

@Injectable()
export class CronTopService {
  private _cpuState: 'free' | 'in-use';
  private job: CronJob<null, null>;

  set cpuState(value: 'free' | 'in-use') {
    this._cpuState = value;
  }

  constructor(
    @Inject(PUB_SUB_INSTANCE) private readonly pubsub: PubSub,
  ) {
    this.job = CronJob.from({
      start: true,
      cronTime: '*/5 * * * * *',
      onTick: () => {
        // Use getCpuPercentage instead!
        this.cpuPercentage();
      },
      timeZone: 'utc',
    });
  }

  private cpuPercentage() {
    const cpuInfo1 = getCpuInfo();

    setTimeout(() => {
      const cpuInfo2 = getCpuInfo();
      const idle = cpuInfo2.idle - cpuInfo1.idle;
      const total = cpuInfo2.total - cpuInfo1.total;
      const percentage = idle / total;

      if (this._cpuState === 'free') {
        this.pubsub.publish(SERVER_STATISTICS_CHANGED, {
          top: {
            cpu: percentage,
          } satisfies Top,
        });
      } else {
        this.pubsub.publish(SERVER_STATISTICS_CHANGED, {
          top: {
            cpu: percentage,
          } satisfies Top,
        });
      }
    }, 1000);
  }
}
