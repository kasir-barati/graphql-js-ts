import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  // Metadata reflection system in TS has several limitations thus we need to use these decorators + their options
  @Field(
    // To prevent potential ambiguities between the TS type system and the GraphQL type system I explicitly specified the type of this field.
    () => ID,
    { nullable: false },
  )
  // A field's type corresponds to a GraphQL type.
  id: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  createdAt: string;

  @Field({ nullable: false })
  updatedAt: string;
}
