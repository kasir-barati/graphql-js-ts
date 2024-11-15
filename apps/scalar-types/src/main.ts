import { generateMnemonic } from 'bip39';
import { randomUUID } from 'crypto';
import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import { RandomDie } from './resolvers/random-die.resolver';
import { rollTheDie } from './utils/roll-the-dice.util';

const port = 4001;
const schema = buildSchema(/* GraphQL */ `
  # have more and more methods based on a random die?
  # RandomDie object type
  type RandomDie {
    # Here we can add the rollOnce method as a field too
    # But since it does not need any input (arguments) we can simply treat it as a field
    # rollOnce: Int
    roll(count: Int!): [Int]
    # Same goes for properties inside RandomDie which are public
    # E.g. if we had a public property in that JS class called ABC of type string then we could have the following:
    # ABC: String
    rollOnce: Int!
  }
  type Query {
    genRandomId: ID!
    rollThreeDice: [Int]
    genRandomMnemonic: String!
    isItNightOnTheServer: Boolean!
    rollDice(howManyDice: Int!, howManySidesDoTheyHave: Int): [Int]
    getDie(numberOfSides: Int): RandomDie
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
  getDie(args) {
    const { numberOfSides } = args;

    return new RandomDie(numberOfSides);
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
