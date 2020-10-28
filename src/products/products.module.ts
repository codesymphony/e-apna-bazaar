import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@/category/category.module';
import { SubCategoryModule } from '@/sub-category/sub-category.module';

import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CategoryModule,
    SubCategoryModule,
  ],
  providers: [ProductsService, ProductsResolver]
})
export class ProductsModule {}
