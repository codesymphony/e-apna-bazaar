import { CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @PrimaryColumn('varchar') categoryName!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string
}