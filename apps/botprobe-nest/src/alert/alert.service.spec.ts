import { PrismaService } from '@shared';
import { SinonMock, SinonMockType } from '@testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let prismaService: SinonMockType<PrismaService>;

  beforeEach(async () => {
    prismaService = SinonMock.of(PrismaService);
    service = new AlertService(prismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
