import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {
  CursorPager,
  FilterQueryBuilder,
  QueryService,
} from '@shared';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { BusinessResolver } from './business/business.resolver';
import { CustomerEntity } from './customer/customer.entity';
import { CustomerRepository } from './customer/customer.repository';
import { CustomerResolver } from './customer/customer.resolver';
import { CustomerService } from './customer/customer.service';
import { CustomerDto } from './customer/dto/customer.dto';
import { AppDataSource } from './shared/data-source';
import { DataloaderService } from './shared/dataloader';

(async () => {
  await AppDataSource.initialize();

  console.log('Connected to database.');

  const schema = await buildSchema({
    resolvers: [BusinessResolver, CustomerResolver],
  });
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4009 },
    context: async () => {
      // I know this is ugly and not practical. But I just wanted to get over it.
      // Maybe later I'll think about refactoring it, MAYBE!
      const customerRepository =
        AppDataSource.getRepository(CustomerEntity);
      const filterQueryBuilder = new FilterQueryBuilder(
        customerRepository,
      );
      const queryService = new QueryService(filterQueryBuilder);
      const cursorPager = new CursorPager(CustomerDto, ['id']);
      const customerService = new CustomerService(
        cursorPager,
        queryService,
        new CustomerRepository(customerRepository),
      );
      const loaders = new DataloaderService(
        customerService,
      ).getLoaders();

      return { loaders };
    },
  });

  BusinessResolver.init();

  console.log(`GraphQL server ready at ${url}`);
})();
