import {
  CursorPager,
  FilterQueryBuilder,
  PagingDto,
  QueryService,
} from '@shared';
import {
  Args,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { CustomerDto } from '../customer/dto/customer.dto';
import { AppDataSource } from '../shared/data-source';
import { GraphQLResolveContext } from '../shared/dataloader';
import { BusinessEntity } from './business.entity';
import { BusinessRepository } from './business.repository';
import { BusinessService } from './business.service';
import {
  BusinessDto,
  BusinessDtoConnection,
} from './dto/business.dto';

@Resolver(() => BusinessDto)
export class BusinessResolver {
  private static businessService: BusinessService;

  static init() {
    const cursorPager = new CursorPager<BusinessDto>(BusinessDto, [
      'id',
    ]);
    const businessRepository =
      AppDataSource.getRepository(BusinessEntity);
    const filterQueryBuilder = new FilterQueryBuilder<BusinessEntity>(
      businessRepository,
    );
    const queryService = new QueryService<BusinessEntity>(
      filterQueryBuilder,
    );
    this.businessService = new BusinessService(
      cursorPager,
      queryService,
      new BusinessRepository(businessRepository),
    );
  }

  @Query(() => BusinessDtoConnection)
  businesses(@Args(() => PagingDto) paging: PagingDto) {
    return BusinessResolver.businessService.findAll(paging);
  }

  @FieldResolver(() => [CustomerDto])
  async customers(
    @Root() business: BusinessDto,
    @Ctx() context: GraphQLResolveContext,
  ) {
    const customer = await context.loaders.customerLoader.load(
      business.id,
    );

    return customer;
  }
}
