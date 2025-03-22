import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared';

import { AlertResolver } from './alert.resolver';
import { AlertService } from './alert.service';

@Module({
  imports: [PrismaModule],
  providers: [AlertResolver, AlertService],
})
export class AlertModule {}
