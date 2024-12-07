import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

export function Edge<T>(NodeClass: new () => T) {
  @ObjectType()
  class Node {
    @Field()
    cursor: string;

    @Field(() => NodeClass)
    @Type(() => NodeClass)
    node: T;
  }

  return Node;
}
