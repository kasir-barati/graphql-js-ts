import { DbClient } from '../types/repository.type';

export class UserRepository {
  constructor(private readonly dbClient: DbClient) {}

  create(username: string) {
    return this.dbClient.user.create({
      data: {
        username,
      },
    });
  }
}
