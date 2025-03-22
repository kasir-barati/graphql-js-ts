import axios from 'axios';

import { TodoBuilder } from '../support/builders/todo.builder';
import { UserBuilder } from '../support/builders/user.builder';
import {
  GetDefaultTodoResponse,
  GetTodoAndAssignedToResponse,
  GetTodoAndCreatedByResponse,
} from '../support/types/todo-response.type';

describe('POST /graphql', () => {
  it('should return default pre-seeded todo', async () => {
    const query = /* GraphQL */ `
      query GetTodo($id: ID!) {
        getTodo(id: $id) {
          id
          content
        }
      }
    `;
    const todoId = 'eec5e3aa-7137-4c9c-a723-ec2f43d4daa4';

    const { data, status } = await axios.post<GetDefaultTodoResponse>(
      `/graphql`,
      {
        query,
        variables: { id: todoId },
      },
    );

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      data: {
        getTodo: {
          id: todoId,
          content: expect.any(String),
        },
      },
    } satisfies GetDefaultTodoResponse);
  });

  it('should return a single todo + who had created it', async () => {
    const query = /* GraphQL */ `
      query GetTodo($id: ID!) {
        getTodo(id: $id) {
          id
          content
          updatedAt
          CreatedBy {
            id
            username
            createdAt
          }
        }
      }
    `;
    const todoId = 'eec5e3aa-7137-4c9c-a723-ec2f43d4daa4';

    const { data, status } =
      await axios.post<GetTodoAndCreatedByResponse>(`/graphql`, {
        query,
        variables: { id: todoId },
      });

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      data: {
        getTodo: {
          id: todoId,
          content: expect.any(String),
          updatedAt: expect.any(String),
          CreatedBy: {
            id: expect.any(String),
            username: 'kasir-barati',
            createdAt: expect.any(String),
          },
        },
      },
    } satisfies GetTodoAndCreatedByResponse);
  });

  it('should return a single todo + to whom it is assigned', async () => {
    const createdById = await new UserBuilder().build();
    const assignedById = await new UserBuilder().build();
    const todoId = await new TodoBuilder()
      .setCreatedById(createdById)
      .setAssignedById(assignedById)
      .build();
    const query = /* GraphQL */ `
      query GetTodo($id: ID!) {
        getTodo(id: $id) {
          id
          AssignedTo {
            id
          }
        }
      }
    `;

    const { data, status } =
      await axios.post<GetTodoAndAssignedToResponse>(`/graphql`, {
        query,
        variables: { id: todoId },
      });

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      data: {
        getTodo: {
          id: todoId,
          AssignedTo: {
            id: assignedById,
          },
        },
      },
    } satisfies GetTodoAndAssignedToResponse);
  });
});
