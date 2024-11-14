import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
// @ts-ignore
import { ruruHTML } from 'ruru/server';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootResolver = {
  hello() {
    return 'Hello world';
  },
};

const app = express();

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});
app.all(
  '/graphql',
  createHandler({ schema, rootValue: rootResolver }),
);

app.listen(
  4000,
  console.log.bind(
    this,
    'Server is listening on http://localhost:4000/graphql',
  ),
);
