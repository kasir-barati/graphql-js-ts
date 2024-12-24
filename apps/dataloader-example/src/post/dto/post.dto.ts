import { Field, ID, ObjectType } from '@nestjs/graphql';
import { fieldDepth } from '@shared';
import { ComplexityEstimatorArgs } from 'graphql-query-complexity';
import { UserDto } from '../../user/dto/user.dto';
import { Post } from '../entities/post.entity';

@ObjectType('Post')
export class PostDto implements Post {
  @Field(() => ID)
  id: string;

  @Field()
  authorId: string;

  @Field(() => UserDto, {
    complexity({ childComplexity, node }: ComplexityEstimatorArgs) {
      const depth = fieldDepth(node);
      const complexity = 1 * depth + childComplexity;

      return complexity;
    },
  })
  author: UserDto;
}
