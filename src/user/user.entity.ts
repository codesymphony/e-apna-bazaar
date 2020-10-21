
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

import { UserGenderEnum } from '../types';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @CreateDateColumn() createdAt!: string

  @CreateDateColumn() updatedAt!: string

  @VersionColumn() version!: number;

  @Column('varchar') email!: string

  @Column('varchar') firstName!: string

  @Column('varchar') lastName!: string

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
  }) gender!: string

  @Column('varchar') mobileNumber!: string

  @Column('varchar', { nullable: true }) aadhaarNumber!: string

  @Column('varchar', { nullable: true, length: 400 }) addressLine1!: string

  @Column('varchar', { nullable: true, length: 400 }) addressLine2!: string

  @Column('varchar', { nullable: true }) city!: string

  @Column('varchar', { nullable: true }) state!: string

  @Column('varchar', { nullable: true }) country!: string

  @Column('boolean', { default: false }) isActive!: boolean

  @Column('boolean', { default: false }) isVerified!: boolean
}