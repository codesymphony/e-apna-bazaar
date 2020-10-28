import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubCategoryEntity } from './subCategory.entity';
import { SubCategoryResolver } from './subCategory.resolver';
import { SubCategoryService } from './subCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity])],
  providers: [SubCategoryResolver, SubCategoryService],
  exports: []
})

export class SubCategoryModule { }