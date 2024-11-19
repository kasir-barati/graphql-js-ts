# NestJS + GraphQL

- GraphQL + TS = better type safety when writing GraphQL queries, end-to-end typing.
<!-- - We use [Apollo server](https://www.apollographql.com/docs/apollo-server). To do that we need [`@nestjs/apollo`](https://www.npmjs.com/package/@nestjs/apollo).
- We will use [Mercurius](https://github.com/mercurius-js/mercurius) which uses [Fastify](https://fastify.dev/) to implement:

  - GraphQL servers.
  - Gateways.

  For this we need [`@nestjs/mercurius`](https://www.npmjs.com/package/@nestjs/mercurius).

> [!NOTE]
>
> NestJS says in its doc that they **provide official integrations** for these GraphQL packages. That's good enough for me to pick these libs.

-->

## Schema first VS Code first

Nest offers both ways of building GraphQL applications, you can learn which one works best for you [here](https://www.reddit.com/r/graphql/comments/rvxlhx/codefirst_vs_schemafirst_approach/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button), and [here](https://www.reddit.com/r/graphql/comments/fpkx7a/codefirst_vs_schemafirst_development/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button). Regardless of which method you use, the GraphQL playground shows the schema. **My conclusion**:

- <img src="./assets/cross-mark.png" with="20" height="20" /> Schema first:
  - Write your GraphQL API via SDL.
  - **Parallelize** frontend & backend development.
  - **Resembles TDD**: Think about the API rather than the implementation.
  - **Easy to read**.
  - Keep resolvers and schema in sync manually.
  - It relies on [default resolvers](./execution-from-inside.md#trivialResolvers).
- <img src="./assets/checkmark.png" width="20" height="20" /> Code first:
  - Generates the SDL from your code.
  - **Single source of truth**.
  - **Generating the schema** can be done automatically as part of our **CI**.
    - [Legibility](https://dictionary.cambridge.org/dictionary/english/legibility): Types can be ordered alphabetically.
    - Can be committed to another repo like what GH does ([ref](https://github.com/octokit/graphql-schema)).
  - Enables us to **modularize schema definition**.
  - **Better dev exp**.
  - **Can do better on localization**, [related issue in GraphQL spec GH repo](https://github.com/graphql/graphql-spec/issues/193).

![Schema first VS Code first in picture](./assets/code-first-VS-schema-first.png)

## Bootstrap your NestJS backend in Nx

<!-- `pnpm add @nestjs/graphql @nestjs/mercurius graphql mercurius`. -->

1. ```shell
   pnpm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
   ```
2. ```shell
   nx g @nx/node:app --framework nest --directory apps/todo-nest
   ```
3. Update your `tsconfig*.json` files to use `NodeNext` instead of `CommonJS`.
4. ```shell
   nx serve todo-nest --configuration=production
   ```

> [!NOTE]
>
> It seems that NestJS does not like the idea of using esbuild, or at least we cannot use it without a lot of troubles.
>
> &mdash; [Ref](https://github.com/nrwl/nx/issues/20546).
