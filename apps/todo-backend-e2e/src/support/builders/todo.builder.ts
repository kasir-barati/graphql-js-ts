import axios from 'axios';
import { CreateTodoBuilderResponse } from '../types/todo.type';

export class TodoBuilder {
  private title: string;
  private content: string;
  private createdById: string;
  private assignedToId?: string;

  constructor() {
    this.title = 'random title ' + Math.random();
    this.content = 'random content ' + Math.random();
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }
  setContent(content: string) {
    this.content = content;
    return this;
  }
  setCreatedById(userId: string) {
    this.createdById = userId;
    return this;
  }
  setAssignedById(userId: string) {
    this.assignedToId = userId;
    return this;
  }

  async build() {
    if (!this.createdById) {
      throw 'Set createdById please when using this builder';
    }

    const query = /* GraphQL */ `
      mutation CreateTodo($input: CreateTodoInput) {
        createTodo(input: $input) {
          id
        }
      }
    `;
    const {
      data: {
        data: {
          createTodo: { id },
        },
      },
    } = await axios.post<CreateTodoBuilderResponse>(`/graphql`, {
      query,
      variables: {
        input: {
          title: this.title,
          content: this.content,
          createdById: this.createdById,
          assignedToId: this.assignedToId,
        },
      },
    });

    return id;
  }
}
