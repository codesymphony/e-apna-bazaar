import { CreateDateColumn, Entity, ManyToOne, Column, PrimaryGeneratedColumn, Index, JoinColumn } from "typeorm";

import { CategoryEntity } from "../category/category.entity";

@Entity('sub_categories')
@Index('sub_catergory_category', ['subCategoryName', 'categoryId'], { unique: true })
export class SubCategoryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @Column('varchar') subCategoryName!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string

  @Column('uuid') categoryId!: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category!: CategoryEntity
}