import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';
import { UserDto } from './user.dto';

@ObjectType('Post')
export class PostDto implements Post {
  @Field(() => ID)
  id: string;

  @Field()
  authorId: string;

  @Field(() => UserDto, {
    complexity(options) {
      return 1;
    },
  })
  author: UserDto;
}
