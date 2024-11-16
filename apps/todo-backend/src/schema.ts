// TODO: change to .graphql
// https://github.com/luckycatfactory/esbuild-graphql-loader/issues/35
export const schema = /* GraphQL */ `
  type User {
    id: ID!
    username: String!
    createdAt: String
    updatedAt: String
  }
  type Todo {
    id: String!
    title: String!
    content: String!
    AssignedTo: User
    assignedToId: ID
    CreatedBy: User!
    createdById: ID!
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    username: String!
  }
  input CreateTodoInput {
    title: String!
    content: String!
    assignedToId: ID
    createdById: ID!
  }
  input UpdateTodoInput {
    title: String
    content: String
    assignedToId: ID
    createdById: ID
  }

  type Query {
    getTodo(id: String!): Todo
    getTodos: [Todo]
  }

  type Mutation {
    createUser(input: UserInput): User
    createTodo(input: CreateTodoInput): Todo
    updateTodo(id: ID!, input: UpdateTodoInput): Todo
    # There is not void in GraphQL. But the primitive types are nullable.
    deleteTodo(id: ID!): String
  }
`;
