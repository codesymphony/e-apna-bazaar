import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SubCategoryService } from './sub-category.service';
import { SubCategoryDTO } from './dto/sub-category.dto';
import { SubCategoryCreateInput } from './inputs/sub-category.create.input';
import { SubCategoryDeleteInput } from './inputs/sub-category.delete.input';

@Resolver()
export class SubCategoryResolver {
  constructor(
    private readonly _subCatService: SubCategoryService
  ) { }

  @Query(() => [SubCategoryDTO])
  async getAllSubCategories() {
    const result = await this._subCatService.getAllSubCategories();

    return result;
  }

  @Query(() => [SubCategoryDTO])
  async getLinkedCategory(
    @Args('categoryId') categoryId: string
  ) {
    const result = this._subCatService.getLinkedSubCategories(categoryId);

    return result;
  }

  @Mutation(() => SubCategoryDTO)
  async createSubCategory(
    @Args('input') input: SubCategoryCreateInput
  ) {
    const result = await this._subCatService.createSubCategory(input);

    return result;
  }

  @Mutation(() => SubCategoryDTO)
  async deleteSubCategory(
    @Args('input') input: SubCategoryDeleteInput
  ) {
    const result = await this._subCatService.deleteSubCategory(input);

    return result;
  }
}
