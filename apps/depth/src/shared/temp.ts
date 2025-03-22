import {
  CursorPager,
  FilterQueryBuilder,
  QueryService,
} from '@shared';

import { BusinessEntity } from '../business/business.entity';
import { BusinessRepository } from '../business/business.repository';
import { BusinessService } from '../business/business.service';
import { BusinessDto } from '../business/dto/business.dto';
import { CustomerEntity } from '../customer/customer.entity';
import { CustomerRepository } from '../customer/customer.repository';
import { CustomerService } from '../customer/customer.service';
import { CustomerDto } from '../customer/dto/customer.dto';
import { AppDataSource } from './data-source';
import { Dataloaders, DataloaderService } from './dataloader';

/**
 * @todo
 * I know this is ugly and not practical. But I just wanted to get over it.
 * Maybe later I'll think about refactoring it, MAYBE!
 */
export function getLoaders(): Dataloaders {
  const customerRepository =
    AppDataSource.getRepository(CustomerEntity);
  const customerFilterQueryBuilder = new FilterQueryBuilder(
    customerRepository,
  );
  const customerQueryService = new QueryService(
    customerFilterQueryBuilder,
  );
  const customerCursorPager = new CursorPager(CustomerDto, ['id']);
  const customerService = new CustomerService(
    customerCursorPager,
    customerQueryService,
    new CustomerRepository(customerRepository),
  );
  const businessRepository =
    AppDataSource.getRepository(BusinessEntity);
  const businessFilterQueryBuilder = new FilterQueryBuilder(
    businessRepository,
  );
  const businessCursorPager = new CursorPager(BusinessDto, ['id']);
  const businessQueryService = new QueryService(
    businessFilterQueryBuilder,
  );
  const businessService = new BusinessService(
    businessCursorPager,
    businessQueryService,
    new BusinessRepository(businessRepository),
  );

  return new DataloaderService(
    customerService,
    businessService,
  ).getLoaders();
}
