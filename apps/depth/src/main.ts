import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloArmor } from '@escape.tech/graphql-armor';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import { BusinessResolver } from './business/business.resolver';
import { CustomerResolver } from './customer/customer.resolver';
import { AppDataSource } from './shared/data-source';
import { getLoaders } from './shared/temp';

(async () => {
  await AppDataSource.initialize();

  console.log('Connected to database.');

  const armor = new ApolloArmor({
    maxDepth: {
      enabled: true,
      ignoreIntrospection: true,
      n: 7,
      flattenFragments: true,
    },
    costLimit: {
      enabled: true,
      depthCostFactor: 1.5,
      objectCost: 2,
      scalarCost: 1,
      ignoreIntrospection: true,
      flattenFragments: true,
      maxCost: 100,
    },
  });
  const schema = await buildSchema({
    resolvers: [BusinessResolver, CustomerResolver],
  });
  const server = new ApolloServer({ schema, ...armor.protect() });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4009 },
    context: async () => {
      const loaders = getLoaders();

      return { loaders };
    },
  });

  BusinessResolver.init();

  console.log(`GraphQL server ready at ${url}`);
})();
