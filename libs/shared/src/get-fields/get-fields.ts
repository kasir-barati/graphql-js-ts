// @ts-nocheck

import { GraphQLResolveInfo } from 'graphql';

import { flattenAST } from './flatten-ast.util';
import { Options } from './types';

/**
 * @link https://github.com/robrichard/graphql-fields/
 */
export function getFields(
  info: GraphQLResolveInfo,
  obj: Record<string, unknown> = {},
  opts: Options = { processArguments: false },
) {
  const fields = structuredClone(info.fieldNodes);
  const ast = structuredClone(info.schema.astNode);

  return fields.reduce((accumulator, field) => {
    return flattenAST({
      ast,
      info,
      accumulator,
      opts,
    });
  }, obj);
}
