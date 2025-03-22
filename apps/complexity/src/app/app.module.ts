import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplexityPlugin } from '@shared';
import { join } from 'path';

import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import appConfig from './configs/app.config';
import { GraphQLConfig } from './configs/graphql.config';
import { TypeOrmConfig } from './configs/typeorm.config';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: [join(__dirname, '..', '..', '.env')],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfig,
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Post]),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: GraphQLConfig,
    }),
  ],
  providers: [ComplexityPlugin, AppResolver, AppService],
})
export class AppModule {}
