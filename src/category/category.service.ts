import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { ICategoryInput } from "./interfaces/category.interface";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRespository: Repository<CategoryEntity>
  ) { }

  async getAllCategories() {
    try {
      const result = await this.categoryRespository.find({})

      return result
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async saveCategory(input: ICategoryInput) {
    const { categoryName } = input
    try {
      const findExisted = await this.categoryRespository.findOne({ where: { categoryName } })
      console.log(findExisted)
      if (findExisted) {
        throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST)
      }
      const result = this.categoryRespository.create({ categoryName })

      await this.categoryRespository.save(result)

      return result
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteCategory(categoryId: string) {
    try {
      const findExisted = await this.categoryRespository.findOne({ where: { id: categoryId } })

      if (!findExisted) {
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST)
      }

      await this.categoryRespository.remove(findExisted)

      return "delete success"
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}