import { Response } from '@testing';

export interface BusinessesErrorResponse {
  errors: {
    message: string;
    extensions: { code: 'GRAPHQL_VALIDATION_FAILED' };
  }[];
}

export type BusinessesResponse = Response<{
  businesses: {
    edges: {
      cursor: string;
      node: {
        id: string;
        name: string;
      };
    }[];
  };
}>;
