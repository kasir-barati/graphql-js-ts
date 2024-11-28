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
import { cpuCronJob, memoryCronJob } from './services/top.service.js';
import { getEnv } from './utils/env.util.js';
import { isNotWhiteListed } from './utils/in-not-whitelisted.util.js';

const { port } = getEnv();

export interface Context {
  ip: string;
}

(async () => {
  const app = express();
  const httpServer = createServer(app);
  const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), {
    encoding: 'utf8',
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const apolloServer = new ApolloServer<Context>({
    schema,
    // Shutdown both the HTTP server and the WebSocketServer gracefully.
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

  httpServer.listen(port, 'localhost', () => {
    console.log(
      `🚀 WebSocket server URL: ws://localhost:${port}/graphql`,
    );
    console.log(
      `🚀 Apollo serve URL: http://localhost:${port}/graphql`,
    );
  });

  cpuCronJob.start();
  memoryCronJob.start();
})()
  .then()
  .catch(console.error);
