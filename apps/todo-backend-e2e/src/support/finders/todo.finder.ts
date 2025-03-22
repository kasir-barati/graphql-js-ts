import axios from 'axios';

import { GetTodoFinderResponse } from '../types/todo.type';

export class TodoFinder {
  async find(id: string) {
    const query = /* GraphQL */ `
      query GetTodo($id: ID!) {
        getTodo(id: $id) {
          id
        }
      }
    `;

    const {
      data: { data },
    } = await axios.post<GetTodoFinderResponse>('/graphql', {
      query,
      variables: { id },
    });

    return data?.getTodo?.id;
  }
}
