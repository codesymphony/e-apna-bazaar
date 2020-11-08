import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guard';

import { ProductCreateInput } from './inputs/product.create.input';
import { ProductDTO } from './dto/product.dto';
import { ProductsService } from './products.service';
import { ProductGetInput, ProductGetMatchingInput } from './inputs/product.get.input';
import { ProductUpdateInput } from './inputs/product.update.input';

@Resolver(() => ProductDTO)
export class ProductsResolver {
  constructor(private _productService: ProductsService) { }

  @UseGuards(AuthGuard)
  @Query(() => [ProductDTO])
  async getAllProducts() {
    const results = await this._productService.getAllProducts();

    return results;
  }

  @UseGuards(AuthGuard)
  @Query(() => [ProductDTO])
  async getMatchingProducts(
    @Args('input') input: ProductGetMatchingInput,
  ) {
    const results = await this._productService.getMatchingProducts(input);

    return results;
  }

  @UseGuards(AuthGuard)
  @Query(() => ProductDTO)
  async getProduct(@Args('input') input: ProductGetInput) {
    const result = await this._productService.getProduct(input);

    return result;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProductDTO)
  async createProduct(@Args('input') input: ProductCreateInput) {
    const result = await this._productService.createProduct(input);

    return result;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProductDTO)
  async updateProduct(@Args('input') input: ProductUpdateInput) {
    const result = await this._productService.updateProduct(input);

    return result;
  }
}
