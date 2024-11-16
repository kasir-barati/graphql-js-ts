import { getDbClient } from '../repositories/db-client';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { CreateUserArg } from '../types/resolvers.type';

const dbClient = getDbClient();
const userRepository = new UserRepository(dbClient);
const userService = new UserService(userRepository);

export function createUser(args: CreateUserArg) {
  const {
    input: { username },
  } = args;
  const user = userService.create(username);

  return user;
}
