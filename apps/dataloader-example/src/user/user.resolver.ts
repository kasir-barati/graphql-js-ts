import {
  Context,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLResolveContext } from '../dataloader/dataloader.type';
import { PostDto } from '../post/dto/post.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => PostDto)
  async posts(
    @Parent() parent: UserDto,
    @Context() context: GraphQLResolveContext,
  ) {
    const post = await context.loaders.postsLoader.load(parent.id);

    console.log('post: ', post);

    return post;
  }
}
