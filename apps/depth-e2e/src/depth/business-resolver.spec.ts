import axios from 'axios';
import { BusinessFinder } from '../support/finders/business.finder';
import {
  BusinessesErrorResponse,
  BusinessesResponse,
} from '../support/types/business.type';

describe('POST /', () => {
  it('should return 10 business', async () => {
    const query = /* GraphQL */ `
      query {
        businesses {
          edges {
            cursor
            node {
              id
              name
            }
          }
        }
      }
    `;

    const res = await axios.post<BusinessesResponse>(`/`, { query });

    expect(res.status).toBe(200);
    expect(res.data.data.businesses.edges.length).toBe(10);
  });

  it('should paginate from page 1 to 2', async () => {
    const businesses = await new BusinessFinder().findAll();
    const { cursor } = businesses.edges[businesses.edges.length - 1];
    const query = /* GraphQL */ `
      query Businesses($after: String, $first: Int) {
        businesses(after: $after, first: $first) {
          edges {
            cursor
            node {
              id
              name
            }
          }
        }
      }
    `;

    const res = await axios.post<BusinessesResponse>(`/`, {
      query,
      variables: { first: 10, after: cursor },
    });

    expect(res.status).toBe(200);
    expect(
      res.data.data.businesses.edges.some(
        (edge) =>
          !!businesses.edges.find(
            (business) => business.node.id === edge.node.id,
          ),
      ),
    ).toBeTrue();
  });

  it('should process queries with less than or equal 7 level of nestedness', async () => {
    const query = /* GraphQL */ `
      query {
        businesses {
          edges {
            cursor
            node {
              id
              name
              customers {
                id
                shopAt {
                  id
                  customers {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await axios.post<BusinessesResponse>(`/`, { query });

    expect(res.status).toBe(200);
    expect(res.data.data.businesses.edges).toBeDefined();
  });

  it('should reject queries with more than 7 level of nestedness', async () => {
    const query = /* GraphQL */ `
      query {
        businesses {
          edges {
            cursor
            node {
              id
              name
              customers {
                id
                shopAt {
                  id
                  customers {
                    id
                    shopAt {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await axios.post<BusinessesErrorResponse>(
      `/`,
      { query },
      {
        validateStatus(status) {
          return status >= 200;
        },
      },
    );

    expect(res.status).toBe(400);
    expect(
      res.data.errors.find(
        (error) =>
          error.message ===
          'Syntax Error: Query depth limit of 7 exceeded, found 8.',
      ),
    ).toBeDefined();
  });

  it('should reject complex queries', async () => {
    const query = /* GraphQL */ `
      query {
        businesses {
          edges {
            cursor
            node {
              id
              name
              createdAt
              updatedAt
              customers {
                id
                name
                shopAtId
                shopAt {
                  id
                  name
                  createdAt
                  updatedAt
                  customers {
                    id
                    name
                    shopAtId
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await axios.post<BusinessesErrorResponse>(
      `/`,
      { query },
      {
        validateStatus(status) {
          return status >= 200;
        },
      },
    );

    expect(res.status).toBe(400);
    expect(
      res.data.errors.find(
        (error) =>
          error.message ===
          'Syntax Error: Query Cost limit of 100 exceeded, found 137.046875.',
      ),
    ).toBeDefined();
  });
});
