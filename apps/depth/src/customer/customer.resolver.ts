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
import { BusinessDto } from '../business/dto/business.dto';
import { AppDataSource } from '../shared/data-source';
import { GraphQLResolveContext } from '../shared/dataloader';
import { CustomerEntity } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import {
  CustomerDto,
  CustomerDtoConnection,
} from './dto/customer.dto';

@Resolver(() => CustomerDto)
export class CustomerResolver {
  private static customerService: CustomerService;

  static init() {
    const cursorPager = new CursorPager(CustomerDto, ['id']);
    const customerRepository =
      AppDataSource.getRepository(CustomerEntity);
    const filterQueryBuilder = new FilterQueryBuilder(
      customerRepository,
    );
    const queryService = new QueryService(filterQueryBuilder);
    CustomerResolver.customerService = new CustomerService(
      cursorPager,
      queryService,
      new CustomerRepository(customerRepository),
    );
  }

  @Query(() => CustomerDtoConnection)
  customers(@Args(() => PagingDto) paging: PagingDto) {
    return CustomerResolver.customerService.findAll(paging);
  }

  @FieldResolver(() => BusinessDto)
  shopAt(
    @Root() customer: CustomerDto,
    @Ctx() context: GraphQLResolveContext,
  ) {
    return context.loaders.businessLoader.load(customer.shopAtId);
  }
}
