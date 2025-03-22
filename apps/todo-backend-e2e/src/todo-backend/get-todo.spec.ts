import axios from 'axios';

import { GetTodoResponse } from '../support/types/todo.type';

describe('POST /graphql', () => {
  it('should get a todo', async () => {
    const query = /* GraphQL */ `
      {
        getTodo(id: "eec5e3aa-7137-4c9c-a723-ec2f43d4daa4") {
          id
          content
        }
      }
    `;

    const {
      data: { data },
      status,
    } = await axios.post<GetTodoResponse>(`/graphql`, {
      query,
    });

    expect(status).toBe(200);
    expect(data).toMatchSnapshot();
  });

  it('should get a todo and rename fields to snake_case', async () => {
    const query = /* GraphQL */ `
      {
        getTodo(id: "eec5e3aa-7137-4c9c-a723-ec2f43d4daa4") {
          id
          content
          created_by: CreatedBy {
            username
          }
        }
      }
    `;

    const {
      data: { data },
      status,
    } = await axios.post<GetTodoResponse>(`/graphql`, {
      query,
    });

    expect(status).toBe(200);
    expect(data).toMatchSnapshot();
  });
});
