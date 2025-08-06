import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GreetMeType {
  @Field()
  someField: string;

  @Field(() => String, { nullable: true })
  message?: string;
}
