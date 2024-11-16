export interface GetTodoResponse {
  data: {
    getTodo: {
      id: string;
      content: string;
    };
  };
}
export interface CreateTodoResponse {
  data: {
    createTodo: {
      CreatedBy: {
        createdAt: number;
        id: string;
        username: string;
      };
      content: string;
      id: string;
    };
  };
}
export interface CreateTodoAssignedToSomeoneResponse {
  data: {
    createTodo: {
      CreatedBy: {
        createdAt: number;
        id: string;
        username: string;
      };
      AssignedTo: {
        updatedAt: number;
        id: string;
        username: string;
      };
      title: string;
      id: string;
    };
  };
}
