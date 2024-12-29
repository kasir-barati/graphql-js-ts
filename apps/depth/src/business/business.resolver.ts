import {
  CursorPager,
  FilterQueryBuilder,
  QueryService,
} from '@shared';
import { Args, Query, Resolver } from 'type-graphql';
import { AppDataSource } from '../shared/data-source';
import { BusinessEntity } from './business.entity';
import { BusinessService } from './business.service';
import {
  BusinessDto,
  BusinessDtoConnection,
} from './dto/business.dto';
import { PagingDto } from './dto/paging.dto';

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
    );
  }

  @Query(() => BusinessDtoConnection)
  businesses(@Args(() => PagingDto) paging: PagingDto) {
    return BusinessResolver.businessService.findAll(paging);
  }
}
