import { Injectable } from '@nestjs/common';

import { CreateTodoInputDto } from './dto/create-todo-input.dto';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodo(id: string) {
    return this.todoRepository.read(id);
  }

  createTodo(inputDto: CreateTodoInputDto) {
    return this.todoRepository.create(inputDto);
  }
}
