
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { makeError } from '@/utils';
import { CATEGORY_ERRORS } from '@/errors';

import { CategoryEntity } from './category.entity';
import { ICategoryInput } from './interfaces/category.interface';

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

  async saveCategory(input: ICategoryInput) {
    const { categoryName } = input;

    try {
      const existing = await this._categoryRespository.findOne({ where: { categoryName } });

      if (existing) {
        throw new HttpException(CATEGORY_ERRORS.NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const result = this._categoryRespository.create({ categoryName });

      await this._categoryRespository.save(result);

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  async deleteCategory(categoryId: string) {
    try {
      const existing = await this._categoryRespository.findOne({ where: { id: categoryId } });

      if (!existing) {
        throw new HttpException(CATEGORY_ERRORS.NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      await this._categoryRespository.remove(existing);

      return 'Category successfully removed';
    } catch (error) {
      throw makeError(error);
    }
  }
}