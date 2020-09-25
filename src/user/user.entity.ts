
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid') id: string


  @CreateDateColumn() createdAt: string


  @CreateDateColumn() updatedAt: string


  @Column('text') email: string


  @Column('text') firstName: string


  @Column('text') lastName: string


  @Column('text') gender: string


  @Column('text', { nullable: true }) aadhaarNumber: string


  @Column('text') addressLine1: string


  @Column('text', { nullable: true }) addressLine2: string


  @Column('text') city: string


  @Column('text') state: string


  @Column('text') country: string


  @Column('text') mobileNumber: string


  @Column('boolean', { default: false }) isActive: boolean


  @Column('boolean', { default: false }) isVerified: boolean


}