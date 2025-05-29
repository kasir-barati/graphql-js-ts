import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';

import {
  NotificationMessage,
  ParseUuidPipe,
  VoidScalar,
} from '../shared';
import { MeDto, NotificationDto, UpdateEmailDto } from './dtos';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => MeDto)
  me(): MeDto {
    return this.userService.me();
  }

  @Mutation(() => VoidScalar)
  async updateEmail(
    @Args('userId', { type: () => String }, ParseUuidPipe)
    userId: string,
    @Args('input', { type: () => UpdateEmailDto })
    { email }: UpdateEmailDto,
  ) {
    await this.userService.updateEmail(userId, email);

    return 0;
  }

  @Subscription(() => NotificationDto, {
    resolve: (payload: NotificationMessage) => payload,
  })
  onNotification() {
    return this.userService.onNotification();
  }
}
