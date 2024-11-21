interface Response<T> {
  data: T;
}

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
