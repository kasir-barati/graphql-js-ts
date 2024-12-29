import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { BusinessResolver } from './business/business.resolver';
import { AppDataSource } from './shared/data-source';

(async () => {
  await AppDataSource.initialize();

  console.log('Connected to database.');

  const schema = await buildSchema({
    resolvers: [BusinessResolver],
  });
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4009 },
  });

  BusinessResolver.init();

  console.log(`GraphQL server ready at ${url}`);
})();
