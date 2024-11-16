interface InputArg<T> {
  input: T;
}
export interface GetTodoArg {
  id: string;
}
export type CreateTodoArg = InputArg<{
  title: string;
  content: string;
  createdById: string;
  assignedToId?: string;
}>;
export type CreateUserArg = InputArg<{
  username: string;
}>;
