import { Field, ID, ObjectType } from '@nestjs/graphql';

import { GreetMeType } from '../../../shared';

@ObjectType()
export class UserType {
  @Field(() => ID, { description: 'ID of the user' })
  id: string;

  @Field(() => GreetMeType, {
    nullable: true,
    description: 'This can be null',
  })
  greetMe?: GreetMeType;
}
