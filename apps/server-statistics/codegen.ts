import { CodegenConfig } from '@graphql-codegen/cli';

export default {
  overwrite: true,
  // schema: "http://localhost:4005",
  schema: 'apps/server-statistics/src/schema.graphql',
  generates: {
    'apps/server-statistics/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './apps/server-statistics/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  config: {
    contextType: 'apps/server-statistics/src/main#Context',
    useIndexSignature: true,
  },
} satisfies CodegenConfig;
