import { DataSource } from 'typeorm';
import { BusinessEntity } from '../business/business.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { getEnv } from './env';

const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } = getEnv();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [BusinessEntity, CustomerEntity],
});
