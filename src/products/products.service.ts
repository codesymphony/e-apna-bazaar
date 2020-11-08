import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';

import {
  IProductCreateInput, IProductGetInput, IProductUpdateInput, IProductGetMatchingInput
} from '@/typings';
import { makeError } from '@/utils';
import { PRODUCT_ERRORS } from '@/errors';
import { CategoryService } from '@/category/category.service';
import { SubCategoryService } from '@/sub-category/sub-category.service';

import { ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly _productRespository: Repository<ProductEntity>,
    private _categoryService: CategoryService,
    private _subCatService: SubCategoryService,
  ) { }

  async getAllProducts() {
    try {
      const products = await this._productRespository.find({});

      return products;
    } catch (error) {
      throw makeError(error);
    }
  }

  async getMatchingProducts(input: IProductGetMatchingInput) {
    try {
      const whereQuery: FindConditions<ProductEntity> = {
        categoryId: input.categoryId,
      };

      if (input.subCategoryId) { whereQuery.subCategoryId = input.subCategoryId; }

      const products = await this._productRespository.find({
        where: whereQuery,
      });

      return products;
    } catch (error) {
      throw makeError(error);
    }
  }

  async getProduct(input: IProductGetInput) {
    try {
      const product = await this._productRespository.findOne({ where: { id: input.productId } });

      return product;
    } catch (error) {
      throw makeError(error);
    }
  }

  async createProduct(input: IProductCreateInput) {
    try {
      const [category, subCategory] = await Promise.all([
        this._categoryService.getCategory({ categoryId: input.categoryId }),
        this._subCatService.getSubCategory({ subCategoryId: input.subCategoryId })
      ]);

      const result = this._productRespository.create({
        productName: input.productName,
        productDesc: input.productDesc,
        category: category,
        subCategory: subCategory
      });

      await this._productRespository.save(result);

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  async updateProduct(input: IProductUpdateInput) {
    const { productId, updates } = input;
  
    try {
      const existing = this._productRespository.findOne({ where: { id: productId } });

      if (!existing) {
        throw new HttpException(PRODUCT_ERRORS.NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      await this._productRespository.update({ id: productId }, { ...updates });

      const updated = this._productRespository.findOne({ id: productId });

      return updated;
    } catch (error) {
      throw makeError(error);
    }
  }
}
