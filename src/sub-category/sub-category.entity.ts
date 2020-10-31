import {
  CreateDateColumn, Entity, ManyToOne, Column, PrimaryColumn, Index, JoinColumn, BeforeInsert, OneToMany,
} from 'typeorm';
import { nanoid } from 'nanoid';

import { ProductEntity } from '@/products/product.entity';
import { CategoryEntity } from '@/category/category.entity';

@Entity('sub_categories')
@Index('sub_category_category', ['subCategoryName', 'categoryId'], { unique: true })
export class SubCategoryEntity {
  @PrimaryColumn('varchar', { length: 21 }) id!: string

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('varchar') subCategoryName!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string

  @Column('varchar', { length: 21 }) categoryId!: string;

  @ManyToOne(() => CategoryEntity, category => category.subCategories)
  @JoinColumn({ name: 'categoryId' })
  category!: CategoryEntity

  @OneToMany(() => ProductEntity, product => product.subCategoryId)
  products?: ProductEntity[]
}