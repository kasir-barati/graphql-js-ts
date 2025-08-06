import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ProductModule } from '../modules/product';
import { UserModule } from '../modules/user';
import { GreetMeResolver } from '../shared';
import { GraphQLConfig } from './graphql.config';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphQLConfig,
    }),
    UserModule,
    ProductModule,
  ],
  providers: [GreetMeResolver],
})
export class AppModule {}
