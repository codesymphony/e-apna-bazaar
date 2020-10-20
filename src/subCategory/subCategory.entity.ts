import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "../category/category.entity";

@Entity('subCategory')
export class SubCategoryEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @PrimaryColumn('text') subCategoryName: string

  @ManyToOne(type => CategoryEntity, category => category.subcategories)
  category: CategoryEntity
}