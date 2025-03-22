// @ts-nocheck
import { GraphQLResolveInfo, SchemaDefinitionNode } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { getArguments } from './get-arguments';
import { getDirectiveResults } from './get-directives';
import { getSelections } from './get-selections.util';
import { AST, Options } from './types';

export function flattenAST({
  ast,
  accumulator,
  info,
  opts,
}: {
  // IDK
  ast: Maybe<SchemaDefinitionNode>;
  info: GraphQLResolveInfo;
  opts: Options;
  accumulator: Record<string, any>;
}): Record<string, any> {
  return getSelections(ast).reduce((flattenedASTs, selection) => {
    if (selection.directives && selection.directives.length) {
      const { shouldInclude, shouldSkip } = getDirectiveResults(
        selection,
        info,
      );
      // field/fragment is not included if either the @skip condition is true or the @include condition is false
      // https://facebook.github.io/graphql/draft/#sec--include
      if (shouldSkip || !shouldInclude) {
        return flattenedASTs;
      }
    }

    if (isFragment(selection)) {
      flattenedASTs = flattenAST({
        ast: getAST(selection, info),
        info,
        accumulator: flattenedASTs,
        opts,
      });

      return flattenedASTs;
    }

    const name = selection.name.value;

    if (
      opts.excludedFields &&
      opts.excludedFields.indexOf(name) !== -1
    ) {
      return flattenedASTs;
    }

    if (!flattenedASTs) {
      throw 'UndefinedOrNullFlattened';
    }

    if (
      flattenedASTs[name] &&
      flattenedASTs[name] !== '__arguments'
    ) {
      Object.assign(
        flattenedASTs[name],
        flattenAST({
          ast: selection,
          info,
          accumulator: flattenedASTs[name],
          opts,
        }),
      );
    } else {
      flattenedASTs[name] = flattenAST({
        ast: selection,
        info,
        accumulator,
        opts,
      });
    }

    // check if the current field has arguments
    if (
      opts.processArguments &&
      selection.arguments &&
      selection.arguments.length
    ) {
      Object.assign(flattenedASTs[name], {
        __arguments: getArguments(selection, info),
      });
    }

    return flattenedASTs;
  }, accumulator);
}

function isFragment(selection: AST) {
  return (
    selection.kind === 'InlineFragment' ||
    selection.kind === 'FragmentSpread'
  );
}

function getAST(selection: AST, info: GraphQLResolveInfo) {
  if (selection.kind === 'FragmentSpread') {
    const fragmentName = selection.name.value;
    return info.fragments[fragmentName];
  }

  return selection;
}
