# Graph QL

- A [query language](./glossary.md#queryLanguageDefinition) for your API.
- A [server-side runtime](./glossary.md#serverSideRuntimeDefinition) for executing queries using a [type system](./glossary.md#typeSystemDefinitionInGraphql) you define for your data.
- The [GraphQL **specification**](https://spec.graphql.org) is open-source.
- [GraphQL is not tied to any specific database or storage engine](https://www.reddit.com/r/graphql/comments/1gr13y6/why_graphql_is_phrasing_being_databaseagnostic_as/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) -- it is backed by your existing code and data.

## My definition of GraphQL

GraphQL is a structured way of talking to the backend and asking for data or performing an operation in a specific way within the established framework of our backend. Meaning we ain't gonna let client to do whatever they want but will give them more room to play but will still have some form dos and don'ts.

## How you create your API in GraphQL

A GraphQL service (AKA GraphQL backend) is created by:

1. **Defining types** and their fields.
2. Writing **a function for each field to provide the required data**.

![a GraphQL service that tells you the name of a logged-in user might look like the code inside the image. In this example the function that provides data for the me field on the Query type uses information about the authenticated user who made the request, while the the name field on the User type is populated by using that user’s ID to fetch their full name from a database.](./assets/first-example.png)

## Sales pitches of GraphQL

### Query what you need

A GraphQL service is running (typically at a URL on a web service):

1. It receives _GraphQL queries_ to validate and execute from clients.
2. The service first checks a query to ensure it only refers to the types and fields defined for the API.
3. Then runs the provided functions to produce a result.

![Example query and response](./assets/example-query-and-response.png)

> [!NOTE]
>
> Client can make queries to the API, here we our client benefits from:
>
> - Responses in the expected shape.
> - Receiving just the data with a single request (no roundtrip).

### No need to do API versioning

- Change your API based on ever evolving client needs without the overhead of managing different API versions.
- E.g. we've got a new feature to develop. Like when you wanna display more info about user on their profile. Thus `User` type could be updated as follows:

  ```graphql
  type User {
    fullName: String
    nickname: String
    name: String @deprecated(reason: "Use `fullName`.")
  }
  ```

  So here is a break down of what will happen next:

  1. Our client can still use `name` in their codebase.
  2. They can see that `name` is flagged as deprecated.
  3. They refactor their code to use `fullname` instead.
  4. We're sure that nobody is using `name` anymore. Thus we get rid of it entirely.

Here is another example of fetching user info when we are only interested in user's `name`, `id` and `appearsIn`.

![Interactive example of how a GraphQL service will work](./assets/interactive-example.gif)

## Hello world app ;)

1. `pnpm add graphql`
2. Define a schema for your GraphQL service.
   - This is where we define our `Query` type.
3. Define root API (AKA root resolver).
   - Defines functions that correspond to the top-level fields in the `Query` type of the schema.
4. Define the query.
5. Make a call to your GraphQL.

Code: [https://github.com/kasir-barati/graphql/blob/main/apps/hello-world/src/main.ts](https://github.com/kasir-barati/graphql/blob/main/apps/hello-world/src/main.ts).

## ExpressJS + GraphQL

1. `pnpm add "express@>=5.0.1" graphql-http graphql`.
2. `nx g @nx/express:application apps/expressjs-hello-world`.
   - `pnpm rm @nx/web @nx/webpack @pmmmwh/react-refresh-webpack-plugin @svgr/webpack webpack-cli react-refresh`.
   - Remove webpack plugin from `nx.json`. And from `project.json` + its files.
   - `nx add @ns/esbuild`.
   - Update your `project.json` to use esbuild instead of webpack.
3. ExpressJS to run a web server.
4. `graphql-http` lib to mount a GraphQL API server on the `/graphql` HTTP endpoint.
5. `pnpm add ruru`.

   - GraphiQL is GraphQL's IDE.
   - You can query and explore your GraphQL API with it.

   ![GraphiQL IDE issued a GraphQL query to our hello endpoint](./assets/expressjs-hello-world-graphiql.png)

6. Or you can run the e2e tests for it: `nx e2e expressjs-hello-world-e2e`.

   BTW To learn more about my thought processes and why I did test it this way you can [read this](https://github.com/kasir-barati/you-say/tree/main/.github/docs/testing#how-to-write-good-integration-tests).

Code: [https://github.com/kasir-barati/graphql/tree/main/apps/expressjs-hello-world](https://github.com/kasir-barati/graphql/tree/main/apps/expressjs-hello-world).

> [!TIP]
>
> - Use [Relay](https://relay.dev/) as your client in your ReactJS app.
> - Or use `graphql-http` to just invoke your GraphQL endpoints over HTTP `POST` requests.

## Dynamic values

To construct GraphQL queries first we need to defined the schema:

```graphql
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
```

Then:

```js
const dice = 3;
const sides = 6;
const query = /* GraphQL */ `
  query RollDice($dice: Int!, $sides: Int) {
    rollDice(numDice: $dice, numSides: $sides)
  }
`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  }),
})
  .then((r) => r.json())
  .then((data) => console.log('data returned:', data));
```

### Let's break down

```graphql
query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}
```

- A word prefixed with a **dollar sign** is a variable in the query.
- `RollDice`:
  - Optional.
  - Serves as an identifier for the query.
  - The **name of the query operation** in the GraphQL syntax.
- `rollDice`:
  - Query type defined in the schema.

```js
body: JSON.stringify({
  query,
  variables: { dice, sides },
}),
```

`variables`:

- Passes field values to the payload.
- The server will replace `$dice` and `$sides` with the values inside the request body.
- No need to escape characters, e.g.:
  - If you embed a value like "O'Hara" directly into a GraphQL query.
  - The apostrophe interfere with the query syntax (parsing error).
  - To prevent this, you’d have to escape it by adding a backslash to ensure the character is read correctly.
  - Like so: "O\'Hara".

## Ref

- [https://graphql.org/graphql-js/authentication-and-express-middleware/](https://graphql.org/graphql-js/authentication-and-express-middleware/).
