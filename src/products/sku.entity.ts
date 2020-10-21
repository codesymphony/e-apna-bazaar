import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('sku')
export class SkuEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @Column('text') sku!: string

  @Column('float') price!: number

  @ManyToOne(() => ProductEntity, product => product.skus)
  product!: ProductEntity
}