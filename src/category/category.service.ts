import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { makeError } from '@/utils';
import { CATEGORY_ERRORS } from '@/errors';
import { ICategoryCreateInput, ICategoryDeleteInput } from '@/typings';

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