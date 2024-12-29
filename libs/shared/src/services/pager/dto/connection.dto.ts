import { Field, ObjectType } from 'type-graphql';
import { Class } from '../../../types/utility.type';
import {
  ConnectionType,
  EdgeType,
  PageInfoType,
} from '../types/dto.type';
import { createEdgeType } from './edge.dto';
import { PageInfoTypeImplementation } from './page-info.dto';

export function createConnectionType<DTO>(DTOClass: Class<DTO>) {
  const Edge = createEdgeType(DTOClass);

  @ObjectType(DTOClass.name + 'Connection')
  class AbstractConnection implements ConnectionType<DTO> {
    static get resolveType() {
      return this;
    }

    constructor(pageInfo?: PageInfoType, edges?: EdgeType<DTO>[]) {
      this.pageInfo = pageInfo ?? {
        hasNextPage: false,
        hasPreviousPage: false,
      };
      this.edges = edges ?? [];
    }

    @Field(() => PageInfoTypeImplementation, {
      description: 'Paging information',
    })
    pageInfo!: PageInfoType;

    @Field(() => [Edge], { description: 'Array of edges.' })
    edges!: EdgeType<DTO>[];
  }

  return AbstractConnection;
}
