import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared';
import { AlertTypeResolver } from './alert-type.resolver';
import { AlertTypeService } from './alert-type.service';

@Module({
  imports: [PrismaModule],
  providers: [AlertTypeResolver, AlertTypeService],
})
export class AlertTypeModule {}
