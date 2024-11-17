import { GraphQLScalarType, Kind } from 'graphql';

export const GraphqlDateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'A custom scalar for ISO-8601 formatted dates',
  serialize(value: unknown): string {
    // Convert a JavaScript Date object to an ISO-8601 string
    if (!(value instanceof Date)) {
      throw new TypeError('Value is not an instance of Date');
    }

    return value.toISOString();
  },
  parseValue(value: unknown): Date {
    // Convert an ISO-8601 string from the client into a Date object
    if (typeof value !== 'string') {
      throw new TypeError('Value is not a valid ISO-8601 string');
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new TypeError('Value is not a valid ISO-8601 string');
    }

    return date;
  },
  parseLiteral(ast): Date {
    // Convert an AST literal string into a Date object
    if (ast.kind !== Kind.STRING) {
      throw new TypeError('Value is not a valid ISO-8601 string');
    }

    const date = new Date(ast.value);

    if (isNaN(date.getTime())) {
      throw new TypeError('Value is not a valid ISO-8601 string');
    }

    return date;
  },
});
