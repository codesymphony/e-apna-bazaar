
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('seller')
export class SellerEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @CreateDateColumn() createdAt: string

  @CreateDateColumn() updatedAt: string

  @Column('text') sellerCategory: string

  @Column('text') description: string
  
  @Column('text') email: string
  
  @Column('text') mobileNumber: string

  @Column('boolean', { default: false }) isActive: boolean

  @Column('boolean', { default: false }) isVerified: boolean
}