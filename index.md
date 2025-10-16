# GraphQL

> [!TIP]
>
> Just for those curious minds who always jump from one branch to another like mine:
>
> - [Hasura](./docs/hasura.md)
> - [GraphQL VS REST](https://www.apollographql.com/blog/graphql-vs-rest).
> - [Testing GraphQL API](./docs/testing-graphql.md)

You can find a good definition usually in [glossary](./docs/glossary.md).

1. [Intro](./docs/intro.md).
2. [Data types](./docs/data-types.md).
3. A simple todo app written with GraphQL + ReactJS + Relay:
   - [Backend](./apps/todo-backend/README.md).
   - [Frontend]() TK.
4. [Queries and mutations in depth](./docs/queries-and-mutations.md).
5. [Let's breakdown the query language a bit more](./docs/graphql-query-language-breakdown.md).
6. [Functions provided by `graphql`](./docs/function-provided-by-graphql.md).
7. [Document your GraphQL service API](./docs/documentation.md).
8. [GraphQL request lifecycle](./docs/graphql-req-lifecycle.md).
   - [Common validation errors](./docs/common-errors.md).
   - [Execution from inside, resolver's args, AST, ...](./docs/execution-from-inside.md)
9. [Code-first approach](./docs/code-first.md).
10. [Auth](./docs/auth.md).
11. [How to query information about a GraphQL schema](./docs/introspection.md).
12. [Improve developer experience](./docs/improve-dev-exp/index.md).
    - [IoC -- Inversion of Control principle](./docs/improve-dev-exp/ioc.md).
    - [Use a `schema.graphql` file](./docs/improve-dev-exp/use-schema-graphql-files.md)
    - [Strongly typed resolvers, context, ...](./docs/improve-dev-exp/strongly-typed.md).
    - [Filtering using `prisma-nestjs-graphql`](./docs/improve-dev-exp/filtering-using-prisma-nestjs-graphql.md).
13. [Security in GraphQL](./docs/security.md).
14. [NestJS](./docs/nestjs.md).
    - [Query complexity](./docs/nestjs.md#query-complexity).
    - [Query depth and complexity in one package](./docs/best-practices/query-depth-and-complexity.md).
    - [Write E2E tests for GraphQL](./subscription/README.md).
    - [Nested field validation with `class-validator` in a GraphQL mutation](./apps/todo-nest/src/app/inputs/test.input.ts).
    - In GraphQL we do not have union types, instead you can use [`@oneOf` directive](https://github.com/graphql/graphql-spec/pull/825), learn more about it [here](https://www.graphql-js.org/docs/oneof-input-objects/). To see how you can do it in NestJS you can check my [`testOneOf` API](./apps/todo-nest/src/app/inputs/define-user.input.ts).
15. [Subscription](./docs/subscription.md).
16. [Best practices](./docs/best-practices/index.md).
    - [Serve over HTTP](./docs/best-practices/serve-over-http.md).
    - [Compress your request/response with GZIP](./docs/best-practices/compress-your-req-res-with-gzip.md).
    - [Avoid versioning](./docs/best-practices/avoid-versioning.md).
    - [Most of the times fields are nullable](./docs/best-practices/most-of-the-times-fields-are-nullable.md).
    - [Pagination](./docs/best-practices/pagination.md).
    - [Communication with a GraphQL service](./docs/best-practices/communication-with-a-graphql-service.md).
    - [Batching](./docs/best-practices/batching.md).
    - [Caching](./docs/best-practices/caching.md).
