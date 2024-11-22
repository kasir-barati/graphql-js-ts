import axios from 'axios';
import { UserBuilder } from '../support/builders/user.builder';
import { CreateTodoResponse } from '../support/types/todo-response.type';

describe('POST /graphql', () => {
  it('should create a todo', async () => {
    const assignedToUserId = await new UserBuilder().build();
    const createdByUserId = await new UserBuilder().build();
    const query = /* GraphQL */ `
      mutation CreateTodo($input: CreateTodoInputDto!) {
        createTodo(input: $input) {
          id
          title
          content
          CreatedBy {
            id
            username
          }
          AssignedTo {
            id
            username
            createdAt
          }
        }
      }
    `;

    const { data, status } = await axios.post<CreateTodoResponse>(
      `/graphql`,
      {
        query,
        variables: {
          input: {
            title: 'created todo title',
            content: 'Create a Todo',
            createdById: createdByUserId,
            assignedToId: assignedToUserId,
          },
        },
      },
    );

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      data: {
        createTodo: {
          id: expect.any(String),
          title: 'created todo title',
          content: 'Create a Todo',
          AssignedTo: {
            id: assignedToUserId,
            username: expect.any(String),
            createdAt: expect.any(String),
          },
          CreatedBy: {
            id: createdByUserId,
            username: expect.any(String),
          },
        },
      },
    } satisfies CreateTodoResponse);
  });
});
