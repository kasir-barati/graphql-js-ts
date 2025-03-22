import { PrismaService } from '@shared';
import { SinonMock, SinonMockType } from '@testing';

import { AlertTypeRepository } from './alert-type.repository';
import { AlertTypeService } from './alert-type.service';

describe('AlertTypeService', () => {
  let service: AlertTypeService;
  let prismaService: SinonMockType<PrismaService>;
  let alertTypeRepository: SinonMockType<AlertTypeRepository>;

  beforeEach(async () => {
    prismaService = SinonMock.of(PrismaService);
    alertTypeRepository = SinonMock.of(AlertTypeRepository);
    service = new AlertTypeService(
      prismaService,
      alertTypeRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
