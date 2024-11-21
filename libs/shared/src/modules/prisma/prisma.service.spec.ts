import { PrismaService } from './prisma.service';

describe('shared', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
  });

  it('should create a prisma client', () => {
    expect(prismaService).toBeDefined();
  });
});
