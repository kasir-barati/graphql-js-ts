import { TodoRepository } from './todo.repository';

describe('TodoRepository', () => {
  let repository: TodoRepository;

  beforeEach(async () => {
    repository = new TodoRepository();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
