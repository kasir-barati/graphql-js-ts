// @ts-nocheck
import { GraphQLResolveInfo } from 'graphql';
import { AST, Directive } from './types';

export function getDirectiveResults(
  selection: AST,
  info: GraphQLResolveInfo,
) {
  const directiveResult = {
    shouldInclude: true,
    shouldSkip: false,
  };

  return selection.directives.reduce((result, directive) => {
    switch (directive.name.value) {
      case 'include':
        return {
          ...result,
          shouldInclude: getDirectiveValue(directive, info),
        };
      case 'skip':
        return {
          ...result,
          shouldSkip: getDirectiveValue(directive, info),
        };
      default:
        return result;
    }
  }, directiveResult);
}

function getDirectiveValue(
  directive: Directive,
  info: GraphQLResolveInfo,
) {
  const arg = directive.arguments[0]; // only arg on an include or skip directive is "if"
  if (arg.value.kind !== 'Variable') {
    return !!arg.value.value;
  }
  return info.variableValues[arg.value.name.value];
}
