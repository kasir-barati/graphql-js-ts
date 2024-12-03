import axios from 'axios';
import { AlertTypesResponse } from '../support/types/alert-type.type';

describe('POST /graphql', () => {
  it('should return all the alarm types with the "leak" inside their name', async () => {
    const query = `#graphql
      query($where: AlertTypeWhereInput!) {
        alertTypes(where: $where) {
          id
          name
          Alerts {
            id
            title
          }
        }
      }
    `;

    const { status, data } = await axios.post<AlertTypesResponse>(
      `/graphql`,
      {
        query,
        variables: {
          where: {
            name: {
              contains: 'leak',
            },
          },
        },
      },
    );

    expect(status).toBe(200);
    expect(data).toEqual({
      data: {
        alertTypes: [
          {
            id: expect.any(String),
            name: 'leak-detection',
            Alerts: expect.anything(),
          },
        ],
      },
    } satisfies AlertTypesResponse);
  });
});
