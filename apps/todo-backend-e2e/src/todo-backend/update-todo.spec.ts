import axios from 'axios';
import { TodoBuilder } from '../support/builders/todo.builder';
import { UserBuilder } from '../support/builders/user.builder';
import {
  UpdateTodoAndAssignedToResponse,
  UpdateTodoResponse,
} from '../support/types/todo.type';

describe('POST /graphql', () => {
  it('should update a todo', async () => {
    const userId = await new UserBuilder().build();
    const todoId = await new TodoBuilder()
      .setCreatedById(userId)
      .build();
    const query = /* GraphQL */ `
      mutation UpdateTodo($id: ID!, $input: UpdateTodoInput) {
        updateTodo(id: $id, input: $input) {
          id
          title
        }
      }
    `;

    const { data, status } = await axios.post<UpdateTodoResponse>(
      `/graphql`,
      {
        query,
        variables: {
          id: todoId,
          input: {
            title: 'new fancy title',
          },
        },
      },
    );

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      data: {
        updateTodo: {
          id: todoId,
          title: 'new fancy title',
        },
      },
    } satisfies UpdateTodoResponse);
  });

  it('should update a todo and who is it assigned to', async () => {
    const createdByUserId = await new UserBuilder().build();
    const assignedToUserId = await new UserBuilder().build();
    const newAssignedToUserId = await new UserBuilder().build();
    const todoId = await new TodoBuilder()
      .setCreatedById(createdByUserId)
      .setAssignedById(assignedToUserId)
      .build();
    const query = /* GraphQL */ `
      mutation UpdateTodo($id: ID!, $input: UpdateTodoInput) {
        updateTodo(id: $id, input: $input) {
          id
          content
          AssignedTo {
            id
          }
        }
      }
    `;

    const { data, status } =
      await axios.post<UpdateTodoAndAssignedToResponse>(`/graphql`, {
        query,
        variables: {
          id: todoId,
          input: {
            content: 'I am changed content',
            assignedToId: newAssignedToUserId,
          },
        },
      });

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      data: {
        updateTodo: {
          id: todoId,
          content: 'I am changed content',
          AssignedTo: {
            id: newAssignedToUserId,
          },
        },
      },
    } satisfies UpdateTodoAndAssignedToResponse);
  });
});
