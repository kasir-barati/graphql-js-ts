import { createTodo, getTodo, updateTodo } from './todo.resolver';
import { createUser } from './user.resolver';

export const rootResolvers = {
  getTodo,
  createTodo,
  updateTodo,
  createUser,
};
