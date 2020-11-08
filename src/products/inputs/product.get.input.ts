import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductGetInput {
  @Field()
  readonly productId!: string;
}

@InputType()
export class ProductGetMatchingInput {
  @Field()
  readonly categoryId!: string;

  @Field({ nullable: true })
  readonly subCategoryId?: string;
}