import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { makeError } from '@/utils';
import { CATEGORY_ERRORS } from '@/errors';
import { ICategoryCreateInput, ICategoryDeleteInput, ICategoryGetInput } from '@/typings';

import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly _categoryRespository: Repository<CategoryEntity>
  ) { }

  async getAllCategories() {
    try {
      const result = await this._categoryRespository.find({});

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  async getCategory(input: ICategoryGetInput) {
    try {
      const result = await this._categoryRespository.findOne({ where: { id: input.categoryId } });

      if (!result) {
        throw new HttpException(CATEGORY_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  // async getSubcategories(input: ICategoryGetInput) {
  //   try {
  //     const result = await this._categoryRespository.findOne({ where: { id: input.categoryId } });

  //     if (!result) {
  //       throw new HttpException(CATEGORY_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
  //     }

  //     const joined = await this._categoryRespository
  //       .createQueryBuilder('category')
  //       .leftJoinAndSelect('category.subCategories', 'subCategory')
  //       .leftJoinAndSelect(
  //         'category.products',
  //         'product',
  //         'product.categoryId = category.id AND product.subCategoryId = subCategory.id',
  //       )
  //       .where('category.id = :categoryId', { categoryId: input.categoryId })
  //       .andWhere('subCategory.subCategoryName like :subCategoryName', { subCategoryName: 'shoes%' })
  //       .printSql()
  //       .getOne();

  //     console.log('sdada', joined);
  //     return joined;
  //   } catch (error) {
  //     throw makeError(error);
  //   }
  // }

  async createCategory(input: ICategoryCreateInput) {
    const { categoryName } = input;

    try {
      const existing = await this._categoryRespository.findOne({ where: { categoryName } });

      if (existing) {
        throw new HttpException(CATEGORY_ERRORS.ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
      }

      const result = this._categoryRespository.create({ categoryName });

      await this._categoryRespository.save(result);

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  async deleteCategory(input: ICategoryDeleteInput) {
    try {
      const existing = await this._categoryRespository.findOne({ where: { id: input.categoryId } });

      if (!existing) {
        throw new HttpException(CATEGORY_ERRORS.NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const categoryCopy = { ...existing };

      await this._categoryRespository.remove(existing);

      return categoryCopy;
    } catch (error) {
      throw makeError(error);
    }
  }
}