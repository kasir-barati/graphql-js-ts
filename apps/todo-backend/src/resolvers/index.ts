import { createTodo, getTodo } from './todo.resolver';
import { createUser } from './user.resolver';

export const rootResolvers = {
  getTodo,
  createTodo,
  createUser,
};
