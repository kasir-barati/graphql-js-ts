import Dataloader from 'dataloader';

import { BusinessEntity } from '../business/business.entity';
import { BusinessService } from '../business/business.service';
import { CustomerService } from '../customer/customer.service';
import { SerializedFindAllByBusinessesIds } from '../customer/customer.type';

export interface Dataloaders {
  customerLoader: Dataloader<
    string,
    SerializedFindAllByBusinessesIds[]
  >;
  businessLoader: Dataloader<string, BusinessEntity>;
}
export interface GraphQLResolveContext {
  loaders: Dataloaders;
}

export class DataloaderService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly businessService: BusinessService,
  ) {}

  getLoaders(): Dataloaders {
    const customerLoader = this.createCustomerLoader();
    const businessLoader = this.createBusinessLoader();

    return {
      customerLoader,
      businessLoader,
    };
  }

  private createCustomerLoader() {
    return new Dataloader<string, SerializedFindAllByBusinessesIds[]>(
      async (keys: Readonly<string[]>) => {
        return this.customerService.getCustomersByBatch(keys);
      },
    );
  }

  private createBusinessLoader() {
    return new Dataloader<string, BusinessEntity>(
      async (keys: Readonly<string[]>) => {
        return this.businessService.getBusinessesByBatch(keys);
      },
    );
  }
}
