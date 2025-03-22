import {
  Args,
  Info,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

import { AlertCreateManyInput } from '../@generated/alert/alert-create-many.input';
import { AlertWhereInput } from '../@generated/alert/alert-where.input';
import { Alert } from '../@generated/alert/alert.model';
import { AlertService } from './alert.service';

@Resolver(() => Alert)
export class AlertResolver {
  constructor(private readonly alertService: AlertService) {}

  @Query(() => [Alert])
  search(
    @Args('where') where: AlertWhereInput,
    @Args('first', {
      type: () => Int,
      nullable: true,
      defaultValue: 10,
    })
    first = 10,
    @Args('after', { nullable: true }) after: string,
    @Args('last', { type: () => Int, nullable: true }) last: number,
    @Args('before', { nullable: true }) before: string,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.alertService.search(where, info);
  }

  @Mutation(() => Alert)
  async createAlert(
    @Args('alert') alert: AlertCreateManyInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.alertService.create(alert, info);
  }
}
