import { ProductEntity } from "src/products/product.entity";
import { Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubCategoryEntity } from "./subCategory.entity";

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @PrimaryColumn('text') categoryName: string

  @ManyToOne(type => ProductEntity, product => product.categories)
  product: ProductEntity

  @OneToMany(type => SubCategoryEntity, subcategory => subcategory.category)
  subcategories: SubCategoryEntity[]
}