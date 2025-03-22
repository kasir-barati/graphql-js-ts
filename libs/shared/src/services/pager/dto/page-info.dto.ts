import { Field, ObjectType } from 'type-graphql';

import { PageInfoType } from '../types/dto.type';

@ObjectType('PageInfo')
export class PageInfoTypeImplementation implements PageInfoType {
  constructor({
    hasNextPage,
    hasPreviousPage,
    endCursor,
    startCursor,
  }: PageInfoType) {
    this.hasNextPage = hasNextPage;
    this.hasPreviousPage = hasPreviousPage;
    this.startCursor = startCursor;
    this.endCursor = endCursor;
  }

  @Field(() => Boolean, {
    nullable: true,
    description: 'true if paging forward and there are more records.',
  })
  hasNextPage: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'true if paging backwards and there are more records.',
  })
  hasPreviousPage: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'The cursor of the first returned record.',
  })
  startCursor?: string;

  @Field(() => String, {
    nullable: true,
    description: 'The cursor of the last returned record.',
  })
  endCursor?: string;
}
