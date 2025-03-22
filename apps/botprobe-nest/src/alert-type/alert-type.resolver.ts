import {
  Args,
  Info,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
// import { Exclude } from '@shared';
import { GraphQLResolveInfo } from 'graphql';

import { AlertTypeCreateManyInput } from '../@generated/alert-type/alert-type-create-many.input';
import { AlertTypeWhereInput } from '../@generated/alert-type/alert-type-where.input';
import { AlertType } from '../@generated/alert-type/alert-type.model';
import { AlertTypeService } from './alert-type.service';
import { AlertsConnection } from './dto/alerts.connection';

@Resolver(() => AlertType)
export class AlertTypeResolver {
  constructor(private readonly alertTypeService: AlertTypeService) {}

  // Does not work! :(
  // @Query(() => [Exclude(AlertType, ['Alerts', '_count'])])
  @Query(() => [AlertType])
  alertTypes(
    @Args('where') where: AlertTypeWhereInput,
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
    return this.alertTypeService.alertTypes(where, info, {
      first,
      after,
      last,
      before,
    });
  }

  @ResolveField(() => AlertsConnection)
  async alertsConnection(
    @Args('first', { type: () => Int, nullable: true }) first: number,
    @Args('after', { nullable: true }) after: string,
    @Args('last', { type: () => Int, nullable: true }) last: number,
    @Args('before', { nullable: true }) before: string,
    @Parent() alertType: AlertType,
  ) {
    return this.alertTypeService.alertsOf(alertType.id, {
      first,
      last,
      after,
      before,
    });
  }

  @Mutation(() => AlertType)
  async createAlertType(
    @Args('alertType') alertType: AlertTypeCreateManyInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.alertTypeService.create(alertType, info);
  }
}
