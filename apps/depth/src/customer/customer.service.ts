import { CursorPager, PagingDto, QueryService } from '@shared';
import { CustomerEntity } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { SerializedFindAllByBusinessesIds } from './customer.type';
import { CustomerDto } from './dto/customer.dto';

export class CustomerService {
  constructor(
    private readonly cursorPager: CursorPager<CustomerDto>,
    private readonly queryService: QueryService<CustomerEntity>,
    private readonly customerRepository: CustomerRepository,
  ) {}

  findAll(paging: PagingDto) {
    return this.cursorPager.page(
      (query) => this.queryService.query(query),
      { paging },
    );
  }

  async getCustomersByBatch(
    businessesIds: readonly string[],
  ): Promise<Array<SerializedFindAllByBusinessesIds[] | Error>> {
    const customers =
      await this.customerRepository.findAllByBusinessesIds(
        businessesIds,
      );
    const mappedResults = this.mapCustomersToBusinessesIds(
      customers,
      businessesIds,
    );

    return mappedResults;
  }

  /**
   * @description
   * When using Dataloader we have to fulfill 2 requirements:
   * 1. `?? null` part: The length of the returned array must be the same with the length of the supplied keys.
   *    We need to return `null` if a customer is not found for a given business ID.
   * 2. `customers.filter` part: The returned values must be ordered in the same order as the supplied keys.
   *    E.g. if the keys are `[1, 3, 4]`, the value must be something like `[customerOfBusiness1, customerOfBusiness3, customerOfBusiness4]`.
   *    The data source might not return them in the same order, so we have to reorder them.
   */
  private mapCustomersToBusinessesIds(
    customers: Readonly<SerializedFindAllByBusinessesIds[]>,
    businessesIds: Readonly<string[]>,
  ): SerializedFindAllByBusinessesIds[][] {
    const mappedCustomers = businessesIds.map((businessId) => {
      const customer = customers.filter(
        (customer) => customer.shopAtId === businessId,
      );

      return customer ?? null;
    });

    // console.log(mappedCustomers);

    return mappedCustomers;
  }
}
