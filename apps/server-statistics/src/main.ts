import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors, { CorsRequest } from 'cors';
import express from 'express';
import { readFileSync } from 'fs';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { join } from 'path';
import { WebSocketServer } from 'ws';
import { resolvers } from './resolvers';
import { getEnv } from './utils/env.util';
import { isNotWhiteListed } from './utils/in-not-whitelisted.util';

const { port } = getEnv();

export interface Context {
  ip: string;
}

(async () => {
  const app = express();
  const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), {
    encoding: 'utf8',
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const httpServer = createServer(app);
  const apolloServer = new ApolloServer<Context>({
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

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<CorsRequest>({
      origin(origin, callback) {
        if (origin && isNotWhiteListed(origin)) {
          callback(new Error('CORS_NotWhitelisted'));
          return;
        }
        callback(null, true);
      },
    }),
    express.json(),
    expressMiddleware(apolloServer, {
      async context({ req }) {
        return { ip: req.ip ?? req.header('x-forwarded-for') };
      },
    }),
  );

  httpServer.listen(
    port,
    'localhost',
    console.log.bind(
      this,
      `🚀 Apollo serve is up and running on http://localhost:${port}/graphql`,
    ),
  );
})()
  .then(console.log)
  .catch(console.error);
