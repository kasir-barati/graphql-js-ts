import { getDbClient } from '../repositories/db-client';
import { TodoRepository } from '../repositories/todo.repository';
import { TodoService } from '../services/todo.service';
import {
  CreateTodoArg,
  DeleteTodoArg,
  GetTodoArg,
  UpdateTodoArg,
} from '../types/resolvers.type';

const dbClient = getDbClient();
const todoRepository = new TodoRepository(dbClient);
const todoService = new TodoService(todoRepository);

export async function getTodo(args: GetTodoArg) {
  const { id } = args;
  const todo = await todoService.getTodo(id);

  return todo;
}
export async function createTodo(args: CreateTodoArg) {
  const { input } = args;
  const todo = await todoService.createTodo(input);

  return todo;
}
export async function updateTodo(args: UpdateTodoArg) {
  const { input, id } = args;
  const todo = await todoService.updateTodo(id, input);

  return todo;
}
export async function deleteTodo(args: DeleteTodoArg) {
  const { id } = args;
  await todoService.deleteTodo(id);

  return;
}
