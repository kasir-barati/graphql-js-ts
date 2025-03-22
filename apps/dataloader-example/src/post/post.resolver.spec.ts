import { SinonMock, SinonMockType } from '@testing';

import { AppResolver } from './post.resolver';
import { AppService } from './post.service';

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
