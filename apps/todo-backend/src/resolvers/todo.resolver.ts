import { getDbClient } from '../repositories/db-client';
import { TodoRepository } from '../repositories/todo.repository';
import { TodoService } from '../services/todo.service';
import { GetTodoArg } from '../types/resolvers.type';

const dbClient = getDbClient();
const todoRepository = new TodoRepository(dbClient);
const todoService = new TodoService(todoRepository);

export async function getTodo(args: GetTodoArg) {
  const { id } = args;
  const todo = await todoService.getTodo(id);

  return todo;
}
