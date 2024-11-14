import { buildSchema, graphql } from 'graphql';

// Constructing a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
// Defining my resolvers
const rootApi = {
  hello() {
    return 'Hello world!';
  },
};
// GraphQL query: "{ hello }"
const query = '{ hello }';

(async () => {
  const response = await graphql({
    schema,
    source: query,
    rootValue: rootApi,
  });

  console.log('Data:');
  console.group();
  console.dir(response.data, { depth: null });
  console.groupEnd();
  console.log('Errors:');
  console.group();
  console.dir(response.errors, { depth: null });
  console.groupEnd();
  console.log('Extensions:');
  console.group();
  console.dir(response.extensions, { depth: null });
  console.groupEnd();
})();
