import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfoMetaData } from '@shared';
import { Type } from 'class-transformer';

import { AlertEdge } from './alert.edge';

@ObjectType()
export class AlertsConnection {
  @Field(() => PageInfoMetaData)
  @Type(() => PageInfoMetaData)
  pageInfo: PageInfoMetaData;

  @Field(() => [AlertEdge])
  @Type(() => AlertEdge)
  edges: AlertEdge[];
}
