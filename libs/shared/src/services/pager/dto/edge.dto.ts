import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

import { Class } from '../../../types/utility.type';
import { EdgeType } from '../types/dto.type';

export function createEdgeType<DTO>(DTOClass: Class<DTO>) {
  @ObjectType(`${DTOClass.name}Edge`)
  class AbstractEdge implements EdgeType<DTO> {
    constructor(node: DTO, cursor: string) {
      this.node = node;
      this.cursor = cursor;
    }

    @Field(() => DTOClass, {
      description: `The node containing the ${DTOClass.name}`,
    })
    node!: DTO;

    @Field(() => String, {
      description: 'Cursor for this node.',
    })
    cursor!: string;
  }

  return AbstractEdge;
}
