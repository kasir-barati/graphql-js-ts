import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

interface ClientOptions {
  log: [
    { emit: 'event'; level: 'query' },
    { emit: 'stdout'; level: 'info' },
    { emit: 'stdout'; level: 'warn' },
    { emit: 'stdout'; level: 'error' },
  ];
  errorFormat: 'pretty';
}

@Injectable()
export class PrismaService
  extends PrismaClient<ClientOptions>
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
    this.$on('query', (event) => {
      Logger.log('Query: ' + event.query);
      Logger.log('Duration: ' + event.duration + 'ms');
      Logger.log('Parameters: ' + event.params);
    });
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
