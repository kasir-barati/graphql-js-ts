import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(async () => {
    repository = new UserRepository(jest.fn());
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
