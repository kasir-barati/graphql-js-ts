import { UserResolver } from './user.resolver';

describe('User', () => {
  it('should be defined', () => {
    expect(new UserResolver()).toBeDefined();
  });
});
