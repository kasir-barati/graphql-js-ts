import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AlertTypeModule } from '../alert-type/alert-type.module';
import { AlertModule } from '../alert/alert.module';
import appConfig from './configs/app.config';
import { GraphQLConfig } from './configs/graphqo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: [join(__dirname, '..', '..', '.env')],
      cache: true,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: GraphQLConfig,
    }),
    AlertModule,
    AlertTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
