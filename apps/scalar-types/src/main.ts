import { generateMnemonic } from 'bip39';
import { randomUUID } from 'crypto';
import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import { rollTheDie } from './utils/roll-the-dice.util';

const port = 4001;
const schema = buildSchema(/* GraphQL */ `
  type Query {
    genRandomId: ID!
    rollThreeDice: [Int]
    genRandomMnemonic: String!
    isItNightOnTheServer: Boolean!
    rollDice(howManyDice: Int!, howManySidesDoTheyHave: Int): [Int]
  }
`);

const rootApi = {
  genRandomId() {
    return randomUUID();
  },
  rollThreeDice() {
    return new Array(3).fill(0).map(() => rollTheDie());
  },
  genRandomMnemonic() {
    return generateMnemonic();
  },
  isItNightOnTheServer() {
    const hours = new Date().getHours();

    return hours > 18 && hours < 1;
  },
  // TODO: no type safety!
  // Resolver receives variables= as its first argument which is called args usually.
  rollDice(args) {
    const { howManySidesDoTheyHave, howManyDice } = args;

    return new Array(howManyDice)
      .fill([])
      .map((die) => die.push(rollTheDie(howManySidesDoTheyHave)));
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
