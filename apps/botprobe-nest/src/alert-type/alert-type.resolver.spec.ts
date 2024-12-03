import { Test, TestingModule } from '@nestjs/testing';
import { AlertTypeResolver } from './alert-type.resolver';

describe('AlertTypeResolver', () => {
  let resolver: AlertTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertTypeResolver],
    }).compile();

    resolver = module.get<AlertTypeResolver>(AlertTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
