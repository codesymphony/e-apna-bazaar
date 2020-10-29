import { CreateDateColumn, Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import { nanoid } from 'nanoid';

@Entity('categories')
export class CategoryEntity {
  @PrimaryColumn('varchar', { length: 21 }) id!: string

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('varchar', { unique: true }) categoryName!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string
}