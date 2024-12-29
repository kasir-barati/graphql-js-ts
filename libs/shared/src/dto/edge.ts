import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Class } from '../types/utility.type';

export function Edge<T>(NodeClass: Class<T>) {
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
