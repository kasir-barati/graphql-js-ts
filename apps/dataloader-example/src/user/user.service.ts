import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsersByBatch(
    userIds: Readonly<string[]>,
  ): Promise<Array<UserDto | Error>> {
    console.log('\n\t========getUsersByBatch========\n');

    const users = await this.userRepository.findAllByIds(userIds);
    const mappedResults = this.mapUsersToUserIds(users, userIds);

    return mappedResults;
  }

  /**
   * @description
   * When using Dataloader we have to fulfill 2 requirements:
   * 1. `?? null` part: The length of the returned array must be equal to the length of the supplied keys.
   *    We need to return `null` if a user is not found for a given user ID.
   * 2. `users.filter` part: The returned values must be ordered in the same order as the supplied keys.
   *    E.g. if the keys are `[User1, User3, User4]`, the value must be something like `[userOfUser1, userOfUser3, userOfUser4]`.
   *    The data source might not return them in the same order, so we have to reorder them.
   */
  private mapUsersToUserIds(
    users: Readonly<User[]>,
    userIds: Readonly<string[]>,
  ): User[] {
    return userIds
      .map((userId) => {
        const filteredUsers = users.filter(
          (user) => user.id === userId,
        );

        return filteredUsers ?? null;
      })
      .flat();
  }
}
