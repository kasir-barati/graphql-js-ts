import { Field, ID, ObjectType } from '@nestjs/graphql';

import { GreetMeType } from '../../../shared';

@ObjectType()
export class ProductType {
  @Field(() => ID, { description: 'The ID of product' })
  id: string;

  @Field(() => GreetMeType, {
    nullable: true,
    description: 'This can be null',
  })
  greetMe?: GreetMeType;
}
