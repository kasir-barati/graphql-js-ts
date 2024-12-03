import { Test, TestingModule } from '@nestjs/testing';
import { AlertResolver } from './alert.resolver';

describe('AlertResolver', () => {
  let resolver: AlertResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertResolver],
    }).compile();

    resolver = module.get<AlertResolver>(AlertResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
