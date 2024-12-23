# Code-First Approach

- So far we've only worked with schema-first approach.
- Here we're not gonna write any schema.
- Instead we're gonna utilize classes exported from `graphql` to define our schema.

```ts
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors, { CorsRequest } from 'cors';
import express from 'express';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: (root, args, context, info) => {
          return 'Hello World';
        },
      },
    },
  }),
});

const app = express();
const apolloServer = new ApolloServer({
  schema,
});

await apolloServer.start();

app.use(
  '/graphql',
  cors<CorsRequest>(),
  express.json(),
  // @ts-ignore
  expressMiddleware(apolloServer),
);

app.listen(4000);
```
