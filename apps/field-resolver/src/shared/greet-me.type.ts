import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GreetMeType {
  @Field()
  parentResolverMessage: string;

  @Field(() => String, { nullable: true })
  message?: string;
}
