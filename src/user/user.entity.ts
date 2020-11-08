
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, VersionColumn } from 'typeorm';
import { nanoid } from 'nanoid';

import { UserGenderEnum } from '@typings/index';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('varchar', { length: 21 }) id!: string

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

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

  @Column('varchar', { nullable: true }) aadhaarNumber?: string

  @Column('varchar', { nullable: true, length: 400 }) addressLine1?: string

  @Column('varchar', { nullable: true, length: 400 }) addressLine2?: string

  @Column('varchar', { nullable: true }) city?: string

  @Column('varchar', { nullable: true }) state?: string

  @Column('varchar', { nullable: true }) country?: string

  @Column('boolean', { default: true }) isActive!: boolean

  @Column('boolean', { default: false }) isVerified!: boolean
}