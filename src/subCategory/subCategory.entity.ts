import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { CategoryEntity } from "../category/category.entity";

@Entity('sub_categories')
export class SubCategoryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @PrimaryColumn('varchar') subCategoryName!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string

  @ManyToOne(() => CategoryEntity)
  category!: CategoryEntity
}