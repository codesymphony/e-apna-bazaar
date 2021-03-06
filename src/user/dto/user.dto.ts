import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field()
  readonly id!: string;

  @Field()
  readonly createdAt!: Date;

  @Field()
  readonly updatedAt!: Date;

  @Field()
  readonly email!: string;

  @Field()
  readonly firstName!: string

  @Field()
  readonly password!: string

  @Field()
  readonly lastName!: string

  @Field()
  readonly gender!: string

  @Field()
  readonly mobileNumber!: string

  @Field(() => Int)
  readonly version!: number

  @Field(() => Boolean)
  readonly isActive!: boolean;

  @Field(() => Boolean)
  readonly isVerified!: boolean;

  @Field({ nullable: true })
  readonly aadhaarNumber?: string

  @Field({ nullable: true })
  readonly addressLine1?: string

  @Field({ nullable: true })
  readonly addressLine2?: string

  @Field({ nullable: true })
  readonly city?: string

  @Field({ nullable: true })
  readonly state?: string

  @Field({ nullable: true })
  readonly country?: string
}