# Strongly typed resolvers

1. ```shell
   pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers @graphql-codegen/introspection
   ```

   Note that `@graphql-codegen/*` are our plugins. We utilize them to generate types automatically:

   - `@graphql-codegen/typescript-resolvers`: creates a `Resolvers` type that you can use to add a type to your resolver map, ensuring your resolvers return values match the field types specified by your schema.

2. ```shell
   pnpx graphql-code-generator init
   ```

   - Configuration file to tell GraphQL Code Generator where and how to generate types.
   - After running this command I did some modifications to it to get it working.

3. Import the generated type into different files if you've split your resolvers into multiple modules, or if it is all in one file use `import type { Resolvers } from './__generated__/resolvers-types';`.

# Strongly typed context

You can type your `context` as well to foster a better dev exp.

1. Export its interface from your code:

   ```ts
   // main.ts
   // ...
   export interface Context {
     ip: string;
     db: PrismaClient;
   }
   // ...
   ```

2. And now in your `codegen.yml`:

   ```yml
   # ...
   config:
     contextType: 'apps/server-statistics/src/main#Context'
     useIndexSignature: true
   # ...
   ```
