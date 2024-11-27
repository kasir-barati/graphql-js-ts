import { getCpuPercentage, getMemoryUsage } from '@shared';
import { CronJob } from 'cron';
import { HTop, Top } from '../__generated__/resolvers-types.js';
import { getRedisPubSub } from './pubsub.service.js';

const redisPubSub = getRedisPubSub();

export const cpuCronJob = CronJob.from({
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
export const memoryCronJob = CronJob.from({
  cronTime: '*/5 * * * * *',
  timeZone: 'utc',
  async onTick() {
    const memoryUsage = getMemoryUsage();

    redisPubSub.publish('htop', {
      htop: {
        memory: memoryUsage.usedMemory,
      } satisfies HTop,
    });
  },
});
