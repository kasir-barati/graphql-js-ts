import { CustomerEntity } from './customer.entity';

export interface RawFindAllByBusinessesIdsCustomer {
  /**@example '000d2a08-21d4-4482-a4a6-f18f67c62787' */
  id: string;
  /**@example 'customer01' */
  name: string;
  /**@example '0088cbc0-c82a-473c-bcae-6954610ddd72' */
  shopAtId: string;
  /**
   * @description This field in the DB is of type `bigint` but it seems that TypeORM is converting it to `string`.
   * @example '1'
   */
  row_number: string;
}
export type SerializedFindAllByBusinessesIds = Omit<
  CustomerEntity,
  'shopAt'
>;
