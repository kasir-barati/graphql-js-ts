import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { AlertTypeWhereInput } from '../@generated/alert-type/alert-type-where.input';
import { AlertType } from '../@generated/alert-type/alert-type.model';
import { AlertTypeService } from './alert-type.service';

@Resolver(() => AlertType)
export class AlertTypeResolver {
  constructor(private readonly alertTypeService: AlertTypeService) {}

  @Query(() => [AlertType])
  alertTypes(
    @Args('where') where: AlertTypeWhereInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.alertTypeService.alertTypes(where, info);
  }
}
