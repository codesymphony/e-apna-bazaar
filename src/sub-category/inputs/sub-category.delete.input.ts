import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubCategoryDeleteInput {
  @Field()
  readonly subCategoryId!: string;
}