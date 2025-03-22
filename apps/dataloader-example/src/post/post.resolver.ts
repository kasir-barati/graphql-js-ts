import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { GraphQLResolveContext } from '../dataloader/dataloader.type';
import { UserDto } from '../user/dto/user.dto';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Resolver(() => PostDto)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostDto], { complexity: 1 })
  getPosts() {
    console.log('getPosts Query says hi');
    return this.postService.getPosts();
  }

  @ResolveField(() => UserDto)
  author(
    @Parent() parent: PostDto,
    @Context() context: GraphQLResolveContext,
  ) {
    console.log('author ResolveField says hi');
    return context.loaders.usersLoader.load(parent.authorId);
  }
}
