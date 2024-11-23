import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import pubsubRedisConfig from './configs/pubsub-redis.config';
import { redisPubSubFactory } from './factories/redis-pubsub.factory';
import { PUB_SUB_INSTANCE } from './pubsub.constant';

@Module({
  imports: [ConfigModule.forFeature(pubsubRedisConfig)],
  providers: [redisPubSubFactory],
  exports: [PUB_SUB_INSTANCE],
})
export class PubSubModule {}
