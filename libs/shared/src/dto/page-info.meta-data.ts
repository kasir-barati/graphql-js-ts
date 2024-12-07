import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfoMetaData {
  @Field({ nullable: true })
  startCursor: string;

  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: true })
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  hasNextPage: boolean;
}
