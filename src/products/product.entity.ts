import {
  Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, VersionColumn, BeforeInsert
} from 'typeorm';
import { nanoid } from 'nanoid';

import { CategoryEntity } from '@/category/category.entity';
import { SubCategoryEntity } from '@/sub-category/sub-category.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn('varchar', { length: 21 }) id!: string

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('varchar') productName!: string

  @Column('varchar', { length: 500 }) productDesc!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string

  @VersionColumn() version!: number;

  @Column('varchar', { length: 21 }) categoryId!: string;

  @Column('varchar', { length: 21 }) subCategoryId!: string;

  @ManyToOne(() => CategoryEntity)
  category!: CategoryEntity

  @ManyToOne(() => SubCategoryEntity)
  subCategory!: SubCategoryEntity
}