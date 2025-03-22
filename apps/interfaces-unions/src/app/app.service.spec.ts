import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get(AppService);
  });

  it('should return "Hello API"', () => {
    const res = service.getData();

    expect(res).toBe('Hello API');
  });
});
