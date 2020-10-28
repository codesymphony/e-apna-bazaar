import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductDTO {
  @Field()
  readonly id!: string

  @Field()
  readonly productName!: string

  @Field()
  readonly productDesc!: string

  @Field()
  readonly categoryId!: string

  @Field()
  readonly subCategoryId!: string

  @Field()
  readonly createdAt!: string

  @Field()
  readonly updatedAt!: string

  @Field(() => Int)
  readonly version!: number
}