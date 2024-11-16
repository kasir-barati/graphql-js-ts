import axios from 'axios';
import { TodoBuilder } from '../support/builders/todo.builder';
import { UserBuilder } from '../support/builders/user.builder';
import { UpdateTodoResponse } from '../support/types/todo.type';

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
});
