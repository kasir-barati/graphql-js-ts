import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ProductType } from './types/product.type';

@Injectable()
export class ProductService {
  findAll(): ProductType[] {
    return [{ id: randomUUID(), greetMe: { someField: 'Find All' } }];
  }

  findOne(id: string): ProductType {
    return { id, greetMe: { someField: 'Find One' } };
  }
}
