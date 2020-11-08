import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guard';

import { SubCategoryService } from './sub-category.service';
import { SubCategoryDTO } from './dto/sub-category.dto';
import { SubCategoryCreateInput } from './inputs/sub-category.create.input';
import { SubCategoryDeleteInput } from './inputs/sub-category.delete.input';

@Resolver()
export class SubCategoryResolver {
  constructor(
    private readonly _subCatService: SubCategoryService
  ) { }

  @UseGuards(AuthGuard)
  @Query(() => [SubCategoryDTO])
  async getAllSubCategories() {
    const result = await this._subCatService.getAllSubCategories();

    return result;
  }

  @UseGuards(AuthGuard)
  @Query(() => [SubCategoryDTO])
  async getSubCategoriesByCategory(
    @Args('categoryId') categoryId: string
  ) {
    const result = this._subCatService.getSubCategoriesByCategory(categoryId);

    return result;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SubCategoryDTO)
  async createSubCategory(
    @Args('input') input: SubCategoryCreateInput
  ) {
    const result = await this._subCatService.createSubCategory(input);

    return result;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SubCategoryDTO)
  async deleteSubCategory(
    @Args('input') input: SubCategoryDeleteInput
  ) {
    const result = await this._subCatService.deleteSubCategory(input);

    return result;
  }
}
