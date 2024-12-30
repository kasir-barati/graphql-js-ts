import { Response } from '@testing';

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
