import { generateMnemonic } from 'bip39';
import { randomUUID } from 'crypto';
import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';

const port = 4001;
const schema = buildSchema(/* GraphQL */ `
  type Query {
    genRandomId: ID!
    rollThreeDice: [Int]
    genRandomMnemonic: String!
    isItNightOnTheServer: Boolean!
  }
`);

const rootApi = {
  genRandomId() {
    return randomUUID();
  },
  rollThreeDice() {
    return new Array(3)
      .fill(0)
      .map(() => 1 + Math.floor(Math.random() * 6));
  },
  genRandomMnemonic() {
    return generateMnemonic();
  },
  isItNightOnTheServer() {
    const hours = new Date().getHours();

    return hours > 18 && hours < 1;
  },
};

const app = express();

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});
// Mounting our GraphQL API to the /graphql endpoint.
app.all('/graphql', createHandler({ schema, rootValue: rootApi }));

app.listen(
  port,
  console.log.bind(
    this,
    `Server is listening on http://localhost:${port}`,
  ),
);
