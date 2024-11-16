import { UserRepository } from '../repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(username: string) {
    return this.userRepository.create(username);
  }
}
