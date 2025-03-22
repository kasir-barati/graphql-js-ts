import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateUserInputDto } from './dto/create-user-input.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('input') inputDto: CreateUserInputDto) {
    return this.userService.createUser(inputDto);
  }
}
