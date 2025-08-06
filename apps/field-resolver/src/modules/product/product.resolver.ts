import { Args, Context, ID, Query, Resolver } from '@nestjs/graphql';

import { ProductService } from './product.service';
import { ProductType } from './types';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductType], { description: 'Fetch all products' })
  findAllProducts() {
    return this.productService.findAll();
  }

  @Query(() => ProductType, { description: 'Fetch a single product' })
  findOneProduct(
    @Args('id', { type: () => ID }) id: string,
    @Context() context: any,
  ) {
    context.name = `Product #${id}`;

    return this.productService.findOne(id);
  }
}
