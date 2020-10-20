import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ISubCategoryInput } from "./interfaces/subCategory.interface";
import { SubCategoryEntity } from "./subCategory.entity";

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly subCatRepository: Repository<SubCategoryEntity>
  ) { }

  async getAllSubCategoryApi() {
    try {
      const result = await this.subCatRepository.find()

      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getSubCategoryByIdApi(id: string) {
    try {
      const result = await this.subCatRepository.findOne({ where: { id } })

      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async addSubCategoryApi(input: ISubCategoryInput) {
    const { subCategoryName } = input
    try {
      const findExisted = await this.subCatRepository.findOne({ where: { subCategoryName } })

      if (findExisted) {
        throw new HttpException('Sub Category already exists', HttpStatus.BAD_REQUEST)
      }

      const result = this.subCatRepository.create({ subCategoryName })

      await this.subCatRepository.save(result)

      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteSubCategoryApi(id: string) {

    try {
      const findExisted = await this.subCatRepository.findOne({ where: { id } })

      if (!findExisted) {
        throw new HttpException('Sub Category does not exist', HttpStatus.BAD_REQUEST)
      }

      await this.subCatRepository.remove(findExisted)

      return "sub category removed"
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

}