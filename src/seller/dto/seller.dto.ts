import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SellerDTO {
  @Field()
  readonly id!: string;

  @Field()
  readonly createdAt!: Date;

  @Field()
  readonly updatedAt!: Date;

  @Field()
  readonly sellerCategory!: string;

  @Field()
  readonly description!: string

  @Field()
  readonly email!: string

  @Field()
  readonly mobileNumber!: string

  @Field()
  readonly isActive!: boolean

  @Field()
  readonly isVerified!: boolean
}