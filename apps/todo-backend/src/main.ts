import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';

import { rootResolvers } from './resolvers';
import { schema } from './schema';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4003;
const builtSchema = buildSchema(schema);
const app = express();

app.get('/', (_req, res) => {
  res.header('content-type', 'text/html');
  res.status(200);
  res.end(
    ruruHTML({
      endpoint: '/graphql',
    }),
  );
});
app.all(
  '/graphql',
  createHandler({ schema: builtSchema, rootValue: rootResolvers }),
);

app.listen(
  port,
  host,
  console.log.bind(this, `[ ready ] http://${host}:${port}`),
);
