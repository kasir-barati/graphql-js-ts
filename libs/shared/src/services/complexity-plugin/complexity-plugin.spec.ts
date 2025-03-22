import { GraphQLSchemaHost } from '@nestjs/graphql';
import { SinonMock, SinonMockType } from '@testing';

import { ComplexityPlugin } from './complexity-plugin';

describe('ComplexityPlugin', () => {
  let graphQLSchemaHost: SinonMockType<GraphQLSchemaHost>;

  beforeEach(() => {
    graphQLSchemaHost = SinonMock.of(GraphQLSchemaHost);
  });

  it('should be defined', () => {
    expect(new ComplexityPlugin(graphQLSchemaHost)).toBeDefined();
  });
});
