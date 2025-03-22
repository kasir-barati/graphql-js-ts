import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplexityPlugin } from '@shared';

import { DataloaderModule } from '../dataloader/dataloader.module';
import { DataloaderService } from '../dataloader/dataloader.service';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import appConfig from './configs/app.config';
import { GraphQLConfig } from './configs/graphql.config';
import { TypeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfig,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule, DataloaderModule],
      inject: [ConfigService, DataloaderService],
      useClass: GraphQLConfig,
    }),
    UserModule,
    PostModule,
  ],
  providers: [ComplexityPlugin],
})
export class AppModule {}
