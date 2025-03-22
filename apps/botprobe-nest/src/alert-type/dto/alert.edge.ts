import { ObjectType } from '@nestjs/graphql';
import { Edge, Exclude } from '@shared';

import { Alert } from '../../@generated/alert/alert.model';

@ObjectType()
export class AlertEdge extends Edge(
  // Does not work here either :(
  Exclude(Alert, ['AlertType']),
) {}
