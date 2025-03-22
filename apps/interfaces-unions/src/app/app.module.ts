import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import appConfig from './configs/app.config';
import { GraphQLConfig } from './configs/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [join(__dirname, '.env')],
      load: [appConfig],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: GraphQLConfig,
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
