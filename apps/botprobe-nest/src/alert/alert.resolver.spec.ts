import { SinonMock, SinonMockType } from '@testing';
import { AlertResolver } from './alert.resolver';
import { AlertService } from './alert.service';

describe('AlertResolver', () => {
  let resolver: AlertResolver;
  let service: SinonMockType<AlertService>;

  beforeEach(async () => {
    service = SinonMock.of(AlertService);
    resolver = new AlertResolver(service);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
