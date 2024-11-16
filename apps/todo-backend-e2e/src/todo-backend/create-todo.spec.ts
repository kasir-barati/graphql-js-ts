import axios from 'axios';
import { UserBuilder } from '../support/builders/user.builder';
import {
  CreateTodoAssignedToSomeoneResponse,
  CreateTodoResponse,
} from '../support/types/todo.type';

describe('POST /graphql', () => {
  it('should create a todo assigned to nobody', async () => {
    const userId = await new UserBuilder().build();
    const query = /* GraphQL */ `
      mutation CreateTodo($input: TodoInput) {
        createTodo(input: $input) {
          id
          content
          CreatedBy {
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
            title: 'shopping',
            content: 'some todo',
            createdById: userId,
          },
        },
      },
    );

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      data: {
        createTodo: {
          id: expect.any(String),
          content: 'some todo',
          CreatedBy: {
            id: userId,
            createdAt: expect.any(String),
            username: expect.any(String),
          },
        },
      },
    } satisfies CreateTodoResponse);
  });

  it('should create a todo assigned to somebody', async () => {
    const createdByUserId = await new UserBuilder().build();
    const assignedToUserId = await new UserBuilder().build();
    const query = /* GraphQL */ `
      mutation CreateTodo($input: TodoInput) {
        createTodo(input: $input) {
          id
          title
          CreatedBy {
            id
            username
            createdAt
          }
          AssignedTo {
            id
            username
            updatedAt
          }
        }
      }
    `;

    const { data, status } =
      await axios.post<CreateTodoAssignedToSomeoneResponse>(
        `/graphql`,
        {
          query,
          variables: {
            input: {
              title: 'mopping -- urgent',
              content:
                'We need to get the bath floor clean by tomorrow!',
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
          title: 'mopping -- urgent',
          CreatedBy: {
            id: createdByUserId,
            createdAt: expect.any(String),
            username: expect.any(String),
          },
          AssignedTo: {
            id: assignedToUserId,
            updatedAt: expect.any(String),
            username: expect.any(String),
          },
        },
      },
    } satisfies CreateTodoAssignedToSomeoneResponse);
  });
});
