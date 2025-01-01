import {
  CursorPager,
  FilterQueryBuilder,
  PagingDto,
  QueryService,
} from '@shared';
import { Args, Query, Resolver } from 'type-graphql';
import { AppDataSource } from '../shared/data-source';
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
    CustomerResolver.customerService.findAll(paging);
  }
}
