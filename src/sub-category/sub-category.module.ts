import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubCategoryEntity } from './sub-category.entity';
import { SubCategoryResolver } from './sub-category.resolver';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity])],
  providers: [SubCategoryResolver, SubCategoryService],
  exports: []
})

export class SubCategoryModule { }