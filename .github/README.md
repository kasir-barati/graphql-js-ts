> [!CAUTION]
>
> Keep this file in sync with [`index.md`](../index.md).

# GraphQL

> [!TIP]
>
> Just for those curious minds who always jump from one branch to another like mine:
>
> - [Hasura](../docs/hasura.md)
> - [GraphQL VS REST](https://www.apollographql.com/blog/graphql-vs-rest).
> - [Testing GraphQL API](../docs/testing-graphql.md)

You can find a good definition usually in [glossary](../docs/glossary.md).

1. [Intro](../docs/intro.md).
2. [Data types](../docs/data-types.md).
3. A simple todo app written with GraphQL + ReactJS + Relay:
   - [Backend](../apps/todo-backend/README.md).
   - [Frontend]() TK.
4. [Queries and mutations in depth](../docs/queries-and-mutations.md).
5. [Let's breakdown the query language a bit more](../docs/graphql-query-language-breakdown.md).
6. [Functions provided by `graphql`](../docs/function-provided-by-graphql.md).
7. [Document your GraphQL service API](../docs/documentation.md).
8. [GraphQL request lifecycle](../docs/graphql-req-lifecycle.md).
   - [Common validation errors](../docs/common-errors.md).
   - [Execution from inside, resolver's args, AST, ...](../docs/execution-from-inside.md)
9. [Code-first approach](../docs/code-first.md).
10. [Auth](../docs/auth.md).
11. [How to query information about a GraphQL schema](../docs/introspection.md).
12. [Improve developer experience](../docs/improve-dev-exp/index.md).
    - [IoC -- Inversion of Control principle](../docs/improve-dev-exp/ioc.md).
    - [Use a `schema.graphql` file](../docs/improve-dev-exp/use-schema-graphql-files.md)
    - [Strongly typed resolvers, context, ...](../docs/improve-dev-exp/strongly-typed.md).
    - [Filtering using `prisma-nestjs-graphql`](../docs/improve-dev-exp/filtering-using-prisma-nestjs-graphql.md).
    - [Use exported enum from Prisma](./docs/prisma/use-enum.md).
13. [Security in GraphQL](../docs/security.md).
14. [NestJS](../docs/nestjs.md).
    - [Query complexity](../docs/nestjs.md#query-complexity).
    - [Query depth and complexity in one package](../docs/best-practices/query-depth-and-complexity.md).
    - [Write E2E tests for GraphQL](../subscription/README.md).
    - In GraphQL we do not have union types, instead:
      - You can use [`@oneOf` directive](https://github.com/graphql/graphql-spec/pull/825), learn more about it [here](https://www.graphql-js.org/docs/oneof-input-objects/).
      - [Here](../apps/todo-nest/src/one-of/email-template.types.ts) is a working example which is using `@oneOf` decorator.
      - A workaround if you are using an old version of `@nestjs/graphql` you can look at [`testOneOf` API](../apps/todo-nest/src/app/inputs/define-user.input.ts).

      > 🛑 **Caution**
      >
      > This directive won't allow you to send both fields at the same time. E.g. in our [`CreateTemplateInput`](https://github.com/kasir-barati/graphql-js-ts/blob/e9d1220f3fc458dad89fa7bd5fdf3fe9cddf592f/apps/todo-nest/src/one-of/email-template.types.ts#L79-L86) you can only specify either `html` or `css`. I.e. this query will fail with `OneOf Input Object \"CreateTemplateInput\" must specify exactly one key.`:
      >
      > ```graphql
      > mutation {
      >   createTemplate(
      >     input: {
      >       css: { template: "body { color: red }" }
      >       html: {
      >         styleIds: []
      >         subject: "some"
      >         template: "html"
      >       }
      >     }
      >   ) {
      >     id
      >   }
      > }
      > ```

15. [Subscription](../docs/subscription.md).
16. [Best practices](../docs/best-practices/index.md).
    - [Serve over HTTP](../docs/best-practices/serve-over-http.md).
    - [Compress your request/response with GZIP](../docs/best-practices/compress-your-req-res-with-gzip.md).
    - [Avoid versioning](../docs/best-practices/avoid-versioning.md).
    - [Most of the times fields are nullable](../docs/best-practices/most-of-the-times-fields-are-nullable.md).
    - [Pagination](../docs/best-practices/pagination.md).
    - [Communication with a GraphQL service](../docs/best-practices/communication-with-a-graphql-service.md).
    - [Batching](../docs/best-practices/batching.md).
    - [Caching](../docs/best-practices/caching.md).
