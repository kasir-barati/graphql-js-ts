import { getCpuPercentage } from '@shared';
import { CronJob } from 'cron';
import { Top } from '../../__generated__/resolvers-types';
import { getRedisPubSub } from './pubsub.service';

const redisPubSub = getRedisPubSub();

export const cronJob = CronJob.from({
  start: true,
  cronTime: '*/5 * * * * *',
  onTick: async () => {
    const res = await getCpuPercentage('free');

    // Just a reminder, our payload should match the top-level resolver field name and return type.
    redisPubSub.publish('server-statistics-changed', {
      top: { cpu: res } satisfies Top,
    });
  },
  timeZone: 'utc',
});
