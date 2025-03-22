import { SinonMock, SinonMockType } from '@testing';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { CronTopService } from './cron-top.service';

describe('CronTopService', () => {
  let service: CronTopService;
  let redisPubSub: SinonMockType<RedisPubSub>;

  beforeEach(async () => {
    redisPubSub = SinonMock.of(RedisPubSub);
    service = new CronTopService(redisPubSub);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
