import { SinonMock, SinonMockType } from '@testing';

import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let repository: SinonMockType<TodoRepository>;

  beforeEach(async () => {
    repository = SinonMock.of(TodoRepository);
    service = new TodoService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
