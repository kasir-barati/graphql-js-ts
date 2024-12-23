# Functions provided by `graphql`

I missed this part and actually I had to come back to this part and learn about it. In fact I was trying to work with GraphQL query in my server and remove some stuff from it just so that I can do something else. And I was literally doing string manipulation and then it dawned on me that I am not the first person who needs these things so let's see how others are doing it.

Besides my approach felt like reinventing the wheel and TBF it also was not as safe as how folks at GraphQL-JS probably had done it.

## [`parse`](https://graphql-js.org/api/function/parse)

```js
import { parse } from 'graphql';
const query = /* GraphQL */ `
  query {
    getUsers(first: 10) {
      id
    }
  }
`;
const ast = parse(query);
```

Find the complete implementation [here](../libs/shared/src/services/complexity-plugin/utils/field-depth-query-normalizer.util.ts)

- Alternatively you can pass your schema definition to it.
- It will return an [AST](./execution-from-inside.md#what-is-ast).

## [`buildASTSchema`](https://graphql-js.org/api/function/buildastschema/)

```js
import { parse, buildASTSchema } from 'graphql';
const schemaString = /* GraphQL */ `
  type User {
    id: ID!
  }
  type Query {
    getUsers(first: Int!): [User!]
  }
`;
const ast = parse(schemaString);
const schema = buildASTSchema(ast);
```

- Takes an [AST](./execution-from-inside.md#what-is-ast).
- Constructs a `GraphQLSchema`.

## [`validate`](https://graphql-js.org/api/function/validate)

- Takes a `GraphQLSchema` and a GraphQL query.
- Validates the query against the `GraphQLSchema`.
- Returns an array of encountered errors.
- Returns an empty array if no errors were encountered and the document is valid.
- Stops validation after a `maxErrors` limit has been reached.
  - Protect us from attackers who send pathologically invalid queries to induce a [DoS attack](./security.md#denial-of-service-attack).
  - By default `maxErrors` set to 100 errors.

## [`execute`](https://graphql-js.org/api/function/execute)

- Takes a `GraphQLSchema` and a GraphQL query.
- Invokes the resolvers of the query's fields.
  - Resolvers should've been defined in the passed `GraphQLSchema`.
- Returns the response, or errors.

## [`print`](https://graphql-js.org/api/function/print)

- Converts an AST into a string.

```js
import { DocumentNode, parse, print } from 'graphql';
const query = /* GraphQL */ `
  query {
    getUsers(first: 10) {
      id
    }
  }
`;
const ast = parse(query);
const definitionNode = (ast as DocumentNode).definitions[0];
print(definitionNode);
```

## [`printSchema`](https://graphql-js.org/api/function/printSchema)

Returns the schema of a `GraphQLSchema` instance in the form of a string.

## [`graphql`](https://graphql-js.org/api/function/graphql)

- Most important function.
- Takes a `GraphQLSchema` instance and a GraphQL query.
- Calls [`validate`](#validate) and [`execute`](#execute).
- AKA GraphQL engine.

> [!TIP]
>
> Orchestrates the invocations of the resolver functions and package the response data according to the shape of the provided query.
