import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProductCreateInput } from './inputs/product.create.input';
import { ProductDTO } from './dto/product.dto';
import { ProductsService } from './products.service';
import { ProductGetInput } from './inputs/product.get.input';

@Resolver()
export class ProductsResolver {
  constructor(private _productService: ProductsService) { }

  @Query(() => [ProductDTO])
  async getAllProducts() {
    const results = await this._productService.getAllProducts();

    return results;
  }

  @Query(() => ProductDTO)
  async getProduct(@Args('input') input: ProductGetInput) {
    const result = await this._productService.getProduct(input);

    return result;
  }
  
  @Mutation(() => ProductDTO)
  async createProduct(@Args('input') input: ProductCreateInput) {
    const result = await this._productService.createProduct(input);

    return result;
  }
}
