import { CategoryEntity } from 'src/category/category.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, OneToMany } from 'typeorm'
import { SkuEntity } from './sku.entity'

@Entity('product')
export class ProductEntity {

  @PrimaryGeneratedColumn('uuid') id: string

  @Column('text') productName: string

  @Column('text') productDesc: string

  @OneToMany(type => CategoryEntity, category => category.product)
  categories: CategoryEntity[]

  @OneToMany(type => SkuEntity, sku => sku.product)
  skus: SkuEntity[]

}