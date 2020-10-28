import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubCategoryCreateInput {
  @Field()
  readonly subCategoryName!: string;

  @Field()
  readonly categoryId!: string;
}