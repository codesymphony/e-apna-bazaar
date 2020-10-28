import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductCreateInput {
  @Field()
  readonly productName!: string

  @Field()
  readonly productDesc!: string

  @Field()
  readonly categoryId!: string

  @Field()
  readonly subCategoryId!: string
}