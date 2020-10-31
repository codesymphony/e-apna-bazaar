import { CreateDateColumn, Entity, Column, PrimaryColumn, BeforeInsert, OneToMany } from 'typeorm';
import { nanoid } from 'nanoid';

import { SubCategoryEntity } from '@/sub-category/sub-category.entity';
import { ProductEntity } from '@/products/product.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryColumn('varchar', { length: 21 }) id!: string

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('varchar', { unique: true }) categoryName!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string

  @OneToMany(() => SubCategoryEntity, subCategory => subCategory.category)
  subCategories?: SubCategoryEntity[];

  @OneToMany(() => ProductEntity, product => product.category)
  products?: ProductEntity[];
}