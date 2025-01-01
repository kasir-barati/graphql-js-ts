import { BusinessEntity } from '../business/business.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { AppDataSource } from './data-source';

(async () => {
  await AppDataSource.initialize();

  const businessRepository =
    AppDataSource.getRepository(BusinessEntity);
  const customerRepository =
    AppDataSource.getRepository(CustomerEntity);

  if ((await businessRepository.count()) > 0) {
    return 'Was seeded!';
  }

  const businesses = new Array<Partial<BusinessEntity>>(100)
    .fill({})
    .map((_, index) => {
      return {
        name: 'business ' + index + 1,
      } satisfies Partial<BusinessEntity>;
    });
  const createdBusinesses = await businessRepository.save(businesses);
  const customers: Partial<CustomerEntity>[] = [];

  for (const business of createdBusinesses) {
    customers.push(
      ...new Array<Partial<CustomerEntity>>(100)
        .fill({})
        .map((_, index) => {
          return {
            name: 'customer' + index + 1,
            shopAtId: business.id,
          } satisfies Partial<CustomerEntity>;
        }),
    );

    if (customers.length === 1000) {
      await customerRepository.save(customers);
      customers.length = 0;
    }
  }

  await AppDataSource.destroy();

  return 'Seeded!';
})()
  .then(console.log)
  .catch(console.error);
