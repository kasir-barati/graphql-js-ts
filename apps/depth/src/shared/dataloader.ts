import Dataloader from 'dataloader';
import { CustomerService } from '../customer/customer.service';
import { SerializedFindAllByBusinessesIds } from '../customer/customer.type';

export interface Dataloaders {
  customerLoader: Dataloader<
    string,
    SerializedFindAllByBusinessesIds[]
  >;
}
export interface GraphQLResolveContext {
  loaders: Dataloaders;
}

export class DataloaderService {
  constructor(private readonly customerService: CustomerService) {}

  getLoaders(): Dataloaders {
    const customerLoader = this.createCustomerLoader();
    return {
      customerLoader,
    };
  }

  private createCustomerLoader() {
    return new Dataloader<string, SerializedFindAllByBusinessesIds[]>(
      async (keys: Readonly<string[]>) => {
        return this.customerService.getCustomersByBatch(keys);
      },
    );
  }
}
