// TODO: change to .graphql
// https://github.com/luckycatfactory/esbuild-graphql-loader/issues/35
export const schema = /* GraphQL */ `
  type User {
    id: ID!
    username: String!
  }
  type Todo {
    id: String!
    content: String!
    assignedTo: User
    createdBy: User!
    createdAt: String!
    updatedAt: String!
  }

  input TodoInput {
    content: String!
    assignedToId: ID
    createdById: ID!
  }

  type Query {
    getTodo(id: String!): Todo
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(input: TodoInput): Todo
    updateTodo(input: TodoInput): Todo
    # There is not void in GraphQL. But the primitive types are nullable.
    deleteTodo(id: ID!): String
  }
`;
