import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';
import { CategoryInput } from './inputs/category.input';

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

  @Mutation(() => CategoryDTO)
  async createCategory(@Args('input') input: CategoryInput) {
    const result = await this._categoryService.saveCategory(input);

    return result;
  }

  @Mutation(() => String)
  async deleteCategory(@Args('categoryId') categoryId: string) {
    const result = await this._categoryService.deleteCategory(categoryId);

    return result;
  }
}