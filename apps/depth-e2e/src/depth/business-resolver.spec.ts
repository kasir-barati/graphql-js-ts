import axios from 'axios';
import { BusinessFinder } from '../support/finders/business.finder';
import { BusinessesResponse } from '../support/types/business.type';

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
});
