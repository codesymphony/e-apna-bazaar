
// import { ObjectType } from 'type-graphql'
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('idea')
export class IdeaEntity {

  @PrimaryGeneratedColumn('uuid') id: string


  @CreateDateColumn() created: string


  @Column('text') idea: string


  @Column('text') desc: string
}