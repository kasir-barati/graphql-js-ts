import axios from 'axios';
import { TodoBuilder } from '../support/builders/todo.builder';
import { UserBuilder } from '../support/builders/user.builder';
import { TodoFinder } from '../support/finders/todo.finder';
import { DeleteTodoResponse } from '../support/types/todo.type';

describe('POST /graphql', () => {
  it('should delete todo', async () => {
    // Arrange
    const userId = await new UserBuilder().build();
    const todoId = await new TodoBuilder()
      .setCreatedById(userId)
      .build();
    const query = /* GraphQL */ `
      mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id)
      }
    `;

    // Act
    const {
      data: { data },
      status,
    } = await axios.post<DeleteTodoResponse>(`/graphql`, {
      query,
      variables: { id: todoId },
    });
    const todo = await new TodoFinder().find(todoId);

    // Assert
    expect(status).toBe(200);
    expect(todo).toBeUndefined(); // Making sure the data is really deleted
    expect(data.deleteTodo).toBeNull(); // Sanity check and making sure changing response schema will be approved before hand
  });
});
