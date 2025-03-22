import { SinonMock, SinonMockType } from '@testing';

import { AlertTypeResolver } from './alert-type.resolver';
import { AlertTypeService } from './alert-type.service';

describe('AlertTypeResolver', () => {
  let resolver: AlertTypeResolver;
  let alertTypeService: SinonMockType<AlertTypeService>;

  beforeEach(async () => {
    alertTypeService = SinonMock.of(AlertTypeService);
    resolver = new AlertTypeResolver(alertTypeService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
