import { Module } from '@nestjs/common';

import { PubSubModule } from '../pubsub/pubsub.module';
import { CronTopService } from './cron-top.service';

@Module({
  imports: [PubSubModule],
  providers: [CronTopService],
  exports: [CronTopService],
})
export class CronTopModule {}
