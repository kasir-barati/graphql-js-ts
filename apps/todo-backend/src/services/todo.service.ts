import { TodoRepository } from '../repositories/todo.repository';

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getTodo(id: string) {
    const todo = await this.todoRepository.read(id);

    return todo;
  }
}
