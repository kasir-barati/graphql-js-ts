// @ts-nocheck
import { GraphQLResolveInfo } from 'graphql';
import { AST, ValueOfArgument } from './types';

export function getArguments(ast: AST, info: GraphQLResolveInfo) {
  return ast.arguments.map((argument) => {
    const argumentValue = getArgumentValue(argument.value, info);

    return {
      [argument.name.value]: {
        kind: argument.value.kind,
        value: argumentValue,
      },
    };
  });
}

function getArgumentValue(
  arg: ValueOfArgument,
  info: GraphQLResolveInfo,
): number | unknown {
  if (arg.kind === 'FloatValue') {
    return parseFloat(arg.value);
  }
  if (arg.kind === 'IntValue') {
    return parseInt(arg.value, 10);
  }
  if (arg.kind === 'Variable') {
    return info.variableValues[arg.name.value];
  }
  if (arg.kind === 'ListValue') {
    return arg.values.map((argument) =>
      getArgumentValue(argument, info),
    );
  }
  if (arg.kind === 'ObjectValue') {
    return arg.fields.reduce(
      (accumulator, objectField) => {
        accumulator[objectField.name.value] = getArgumentValue(
          objectField.value,
          info,
        );
        return accumulator;
      },
      {} as Record<string, unknown>,
    );
  }

  return arg.value;
}
