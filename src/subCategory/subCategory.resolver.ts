import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SubCategoryService } from "./subCategory.service";
import { SubCategoryDTO } from './dto/subCategory.dto'
import { SubCategoryInput } from "./inputs/subCategory.create.input";

@Resolver()
export class SubCategoryResolver {
  constructor(
    private readonly subCatService: SubCategoryService
  ) { }

  @Query(() => [SubCategoryDTO])
  async getAllSubCategories() {
    const result = await this.subCatService.getAllSubCategoryApi()

    return result
  }

  @Mutation(() => SubCategoryDTO)
  async createSubCategory(
    @Args('input') input: SubCategoryInput
  ) {
    const result = await this.subCatService.addSubCategoryApi(input)

    return result
  }

  @Mutation(() => String)
  async deleteSubCategory(
    @Args('id') id: string
  ) {
    const result = await this.subCatService.deleteSubCategoryApi(id)

    return result
  }
}

