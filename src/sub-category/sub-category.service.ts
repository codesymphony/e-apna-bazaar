import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { makeError } from '@/utils';
import { ISubCategoryCreateInput, ISubCategoryDeleteInput, ISubCategoryGetInput } from '@/typings';
import { SUB_CATEGORY_ERRORS } from '@/errors';

import { SubCategoryEntity } from './sub-category.entity';

@Injectable()
export class SubCategoryService {
  subCatRepository: any;
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly _subCatRepository: Repository<SubCategoryEntity>
  ) { }

  async getAllSubCategories() {
    try {
      const result = await this._subCatRepository.find();

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  async getLinkedSubCategories(categoryId: string) {
    try {

      const result = await this._subCatRepository.find({ where: { categoryId } });

      return result;

    } catch (error) {
      throw makeError(error);
    }
  }

  async getSubCategory(input: ISubCategoryGetInput) {
    try {
      const result = await this._subCatRepository.findOne({ where: { id: input.subCategoryId } });

      if (!result) {
        throw new HttpException(SUB_CATEGORY_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  async createSubCategory(input: ISubCategoryCreateInput) {
    const { subCategoryName, categoryId } = input;

    try {
      const existing = await this._subCatRepository.findOne({
        where: { subCategoryName, categoryId }
      });

      if (existing) {
        throw new HttpException(SUB_CATEGORY_ERRORS.ALREADY_EXISTS_FOR_CATEGORY, HttpStatus.BAD_REQUEST);
      }

      const result = this._subCatRepository.create({ subCategoryName, categoryId });

      await this._subCatRepository.save(result);

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  async deleteSubCategory(input: ISubCategoryDeleteInput) {
    try {
      const existing = await this._subCatRepository.findOne({ where: { id: input.subCategoryId } });

      if (!existing) {
        throw new HttpException(SUB_CATEGORY_ERRORS.NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const subCategoryCopy = { ...existing };

      await this._subCatRepository.remove(existing);

      return subCategoryCopy;
    } catch (error) {
      throw makeError(error);
    }
  }
}