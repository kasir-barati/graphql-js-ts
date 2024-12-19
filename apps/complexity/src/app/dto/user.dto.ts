import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { PostDto } from './post.dto';

@ObjectType('User')
export class UserDto implements User {
  @Field(() => ID)
  id: string;

  @Field(() => [PostDto], { complexity: 1 })
  posts: PostDto[];
}
