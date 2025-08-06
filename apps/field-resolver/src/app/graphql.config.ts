import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';

export class GraphQLConfig implements GqlOptionsFactory {
  createGqlOptions():
    | ApolloDriverConfig
    | Promise<ApolloDriverConfig> {
    return {
      playground: false,
      autoSchemaFile: join(__dirname, 'src', 'schema.gql'),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
        },
      },
      debug: process.env.NODE_ENV !== 'production',
    };
  }
}
