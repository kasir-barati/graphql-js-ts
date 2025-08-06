import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ProductType } from './types/product.type';

@Injectable()
export class ProductService {
  findAll(): ProductType[] {
    return [
      {
        id: randomUUID(),
        greetMe: { parentResolverMessage: 'I found all products' },
      },
    ];
  }

  findOne(id: string): ProductType {
    return {
      id,
      greetMe: { parentResolverMessage: 'I found your product' },
    };
  }
}
