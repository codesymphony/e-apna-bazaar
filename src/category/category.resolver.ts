import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';
import { CategoryCreateInput } from './inputs/category.create.input';
import { CategoryDeleteInput } from './inputs/category.delete.input';

@Resolver()
export class CategoryResolver {
  constructor(
    private readonly _categoryService: CategoryService
  ) { }

  @Query(() => [CategoryDTO])
  async getAllCategories() {
    const result = await this._categoryService.getAllCategories();

    return result;
  }

  
  @Query(() => String)
  async getSubcategories(
    @Args('categoryId') categoryId: string,
  ) {
    const result = await this._categoryService.getSubcategories({ categoryId });

    return result;
  }

  @Mutation(() => CategoryDTO)
  async createCategory(@Args('input') input: CategoryCreateInput) {
    const result = await this._categoryService.createCategory(input);

    return result;
  }

  @Mutation(() => CategoryDTO)
  async deleteCategory(@Args('input') input: CategoryDeleteInput) {
    const result = await this._categoryService.deleteCategory(input);

    return result;
  }
}