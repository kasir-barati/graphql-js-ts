import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { readFileSync } from 'fs';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { join } from 'path';
import { WebSocketServer } from 'ws';
import { resolvers } from './resolvers';

const PORT = 4005;
const app = express();
const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), {
  encoding: 'utf8',
});
const schema = makeExecutableSchema({ typeDefs, resolvers });
const httpServer = createServer(app);
const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});
const serverCleanup = useServer({ schema }, wsServer);

httpServer.listen(
  PORT,
  'localhost',
  console.log.bind(
    this,
    `🚀 Apollo serve is up and running on http://localhost:${PORT}`,
  ),
);
