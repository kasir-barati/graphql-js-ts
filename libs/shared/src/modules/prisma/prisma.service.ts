import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<{
    log: [
      { emit: 'event'; level: 'query' },
      { emit: 'stdout'; level: 'info' },
      { emit: 'stdout'; level: 'warn' },
      { emit: 'stdout'; level: 'error' },
    ];
    errorFormat: 'pretty';
  }>
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.$on('query', (e) => {});
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
