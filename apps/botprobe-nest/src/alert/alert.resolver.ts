import {
  Args,
  Info,
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
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.alertService.search(where, info);
  }

  @Mutation(() => Alert)
  async create(
    @Args('alert') alert: AlertCreateManyInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.alertService.create(alert, info);
  }
}
