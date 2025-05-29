import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

export function getDefaultModules(): DynamicModule[] {
  return [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      playground: false,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
        },
      },
    }),
  ];
}
