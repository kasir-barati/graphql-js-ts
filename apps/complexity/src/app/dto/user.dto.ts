import { Field, ID, ObjectType } from '@nestjs/graphql';
import { fieldDepth } from '@shared';
import { ComplexityEstimatorArgs } from 'graphql-query-complexity';
import { User } from '../entities/user.entity';
import { PostDto } from './post.dto';

@ObjectType('User')
export class UserDto implements User {
  @Field(() => ID)
  id: string;

  @Field(() => [PostDto], {
    complexity({ childComplexity, node }: ComplexityEstimatorArgs) {
      const depth = fieldDepth(node);
      const complexity = 1 * depth + childComplexity;

      return complexity;
    },
  })
  posts: PostDto[];
}
