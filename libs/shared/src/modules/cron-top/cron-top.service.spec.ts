import { Test, TestingModule } from '@nestjs/testing';
import { CronTopService } from './cron-top.service';

describe('CronTopService', () => {
  let service: CronTopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronTopService],
    }).compile();

    service = module.get<CronTopService>(CronTopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
