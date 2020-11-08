import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ProductUpdates {
  @Field({ nullable: true })
  readonly productName?: string

  @Field({ nullable: true })
  readonly productDesc?: string

  @Field({ nullable: true })
  readonly categoryId?: string

  @Field({ nullable: true })
  readonly subCategoryId?: string
}

@InputType()
export class ProductUpdateInput {
  @Field()
  readonly productId!: string;

  @Field()
  readonly updates!: ProductUpdates;
}