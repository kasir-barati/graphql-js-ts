import { Module } from '@nestjs/common';
import { AlertTypeResolver } from './alert-type.resolver';

@Module({
  providers: [AlertTypeResolver],
})
export class AlertTypeModule {}
