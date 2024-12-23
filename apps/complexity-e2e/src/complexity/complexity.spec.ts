import axios from 'axios';
import { GraphQLErrorResponse } from '../support/types/error.type';

describe('POST /graphql', () => {
  it('should return a complexity error', async () => {
    const query = /* GraphQL */ `
      query {
        getPosts {
          id
          author {
            posts {
              id
              author {
                posts {
                  id
                  author {
                    posts {
                      id
                      author {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const { data, status } = await axios.post<GraphQLErrorResponse>(
      `/graphql`,
      { query },
      {
        validateStatus(status) {
          return status >= 200;
        },
      },
    );

    console.dir(data, { depth: null });

    expect(status).toBe(500);
    expect(data.errors[0].message).toBe(
      'Query is too complex: 47. Maximum allowed complexity: 20',
    );
  });
});
