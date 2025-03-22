import { Repository } from 'typeorm';

import { CustomerEntity } from './customer.entity';
import {
  RawFindAllByBusinessesIdsCustomer,
  SerializedFindAllByBusinessesIds,
} from './customer.type';

export class CustomerRepository {
  constructor(
    public readonly repository: Repository<CustomerEntity>,
  ) {}

  async findAllByBusinessesIds(businessesIds: readonly string[]) {
    /**
     * @description
     * - Result needs to be serialized.
     * - We have to use `this.repository.manager.connection.createQueryBuilder`
     *   since if we use `this.repository.createQueryBuilder` it'll add extra
     *   `FROM` clause, generating a different query!
     *
     * @link https://github.com/typeorm/typeorm/issues/4015
     * @link https://stackoverflow.com/a/73916935/8784518
     */
    const result = await this.repository.manager.connection
      .createQueryBuilder()
      .select('*')
      .from((queryBuilder) => {
        return queryBuilder
          .select('*')
          .addSelect(
            'ROW_NUMBER() OVER(PARTITION BY "shopAtId" ORDER BY id)',
          )
          .from(CustomerEntity, 'customers')
          .where('"shopAtId" IN (:...ids)', { ids: businessesIds });
      }, 'customers_of_shops')
      .where('row_number <= :length', {
        length: businessesIds.length,
      })
      .getRawMany();

    return this.serializeFindAllByBusinessesIds(result);
  }

  private serializeFindAllByBusinessesIds(
    result: RawFindAllByBusinessesIdsCustomer[],
  ): SerializedFindAllByBusinessesIds[] {
    return result.map((unsanitizedCustomer) => {
      const { row_number, ...rest } = unsanitizedCustomer;
      return {
        ...rest,
      };
    });
  }
}
