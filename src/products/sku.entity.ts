import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sku')
export class SkuEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @Column('text') sku!: string

  @Column('float') price!: number
}