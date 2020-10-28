import { CreateDateColumn, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @Column('varchar', { unique: true }) categoryName!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string
}