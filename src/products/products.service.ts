import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IProductCreateInput, IProductGetInput } from '@/typings';
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
}
