import { Response } from './common.type';

export type CreateTodoResponse = Response<{
  createTodo: {
    id: string;
    title: string;
    content: string;
    AssignedTo: {
      id: string;
      createdAt: string;
      username: string;
    };
    CreatedBy: {
      id: string;
      username: string;
    };
  };
}>;
export type GetDefaultTodoResponse = Response<{
  getTodo: {
    id: string;
    content: string;
  };
}>;
export type GetTodoAndCreatedByResponse = Response<{
  getTodo: {
    id: string;
    content: string;
    updatedAt: string;
    CreatedBy: {
      id: string;
      username: string;
      createdAt: string;
    };
  };
}>;
export type GetTodoAndAssignedToResponse = Response<{
  getTodo: {
    id: string;
    AssignedTo: {
      id: string;
    };
  };
}>;
export type CreateTodoBuilderResponse = Response<{
  createTodo: { id: string };
}>;
