import { SinonMock, SinonMockType } from '@testing';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

describe('AppResolver', () => {
  let resolver: AppResolver;
  let service: SinonMockType<AppService>;

  beforeEach(async () => {
    service = SinonMock.of(AppService);
    resolver = new AppResolver(service);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
