interface InputArg<T> {
  input: T;
}
interface IdWithInputArg<InputType> extends InputArg<InputType> {
  id: string;
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
export type UpdateTodoArg = IdWithInputArg<{
  title?: string;
  content?: string;
  createdById?: string;
  assignedToId?: string;
}>;
export type DeleteTodoArg = {
  id: string;
};
export type CreateUserArg = InputArg<{
  username: string;
}>;
