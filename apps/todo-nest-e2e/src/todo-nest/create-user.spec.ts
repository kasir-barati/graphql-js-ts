import axios from 'axios';

import { CreateUserResponse } from '../support/types/user-response.type';

describe('POST /graphql', () => {
  it('should create a user', async () => {
    const query = /* GraphQL */ `
      mutation CreateUser($input: CreateUserInputDto!) {
        createUser(input: $input) {
          id
          username
          createdAt
        }
      }
    `;
    const randomUsername = `e2e_${Math.random()}_username`;

    const { data, status } = await axios.post<CreateUserResponse>(
      `/graphql`,
      {
        query,
        variables: {
          input: {
            username: randomUsername,
          },
        },
      },
    );

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      data: {
        createUser: {
          id: expect.any(String),
          username: randomUsername,
          createdAt: expect.any(String),
        },
      },
    } satisfies CreateUserResponse);
  });
});
