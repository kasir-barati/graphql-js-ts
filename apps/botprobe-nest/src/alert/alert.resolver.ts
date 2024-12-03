import { Resolver } from '@nestjs/graphql';
import { Alert } from '../@generated/alert/alert.model';

@Resolver(() => Alert)
export class AlertResolver {}
