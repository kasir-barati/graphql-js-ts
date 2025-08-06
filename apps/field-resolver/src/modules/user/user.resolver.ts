import { Args, Context, Query, Resolver } from '@nestjs/graphql';

import { UserType } from './types';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType], { description: 'Fetch all users' })
  findAllUsers() {
    return this.userService.findAll();
  }

  @Query(() => UserType, { description: 'Fetch a single user' })
  findOneUser(
    @Args('id', { type: () => String }) id: string,
    @Context() context: any,
  ) {
    context.name = `User #${id}`;

    return this.userService.findOne(id);
  }
}
