import { Module } from '@nestjs/common';
import { AlertResolver } from './alert.resolver';

@Module({
  providers: [AlertResolver],
})
export class AlertModule {}
