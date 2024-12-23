import { GraphQLFormattedError } from 'graphql';

export interface GraphQLErrorResponse {
  errors: GraphQLFormattedError[];
}
