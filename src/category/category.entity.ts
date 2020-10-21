import { ProductEntity } from "src/products/product.entity";
import { Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubCategoryEntity } from "../subCategory/subCategory.entity";

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @PrimaryColumn('text') categoryName!: string

  @ManyToOne(() => ProductEntity, product => product.categories)
  product!: ProductEntity

  @OneToMany(() => SubCategoryEntity, subcategory => subcategory.category)
  subcategories!: SubCategoryEntity[]
}