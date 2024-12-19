import {
  Info,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { AppService } from './app.service';
import { PostDto } from './dto/post.dto';
import { UserDto } from './dto/user.dto';

@Resolver(() => PostDto)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => [PostDto])
  getPosts() {
    return this.appService.getPosts();
  }

  @ResolveField(() => UserDto)
  author(
    @Parent() parent: PostDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.appService.getUser(parent.authorId, info);
  }
}
