import {
  CreateDateColumn, Entity, ManyToOne, Column, PrimaryColumn, Index, JoinColumn, BeforeInsert
} from 'typeorm';
import { nanoid } from 'nanoid';

import { CategoryEntity } from '@/category/category.entity';

@Entity('sub_categories')
@Index('sub_catergory_category', ['subCategoryName', 'categoryId'], { unique: true })
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

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category!: CategoryEntity
}