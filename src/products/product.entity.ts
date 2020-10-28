import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, VersionColumn
} from 'typeorm';

import { CategoryEntity } from '@/category/category.entity';
import { SubCategoryEntity } from '@/sub-category/sub-category.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @Column('varchar') productName!: string

  @Column('varchar', { length: 500 }) productDesc!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string

  @VersionColumn() version!: number;

  @ManyToOne(() => CategoryEntity)
  category!: CategoryEntity

  @ManyToOne(() => SubCategoryEntity)
  subCategory!: SubCategoryEntity
}