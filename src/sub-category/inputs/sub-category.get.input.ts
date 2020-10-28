import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubCategoryGetInput {
  @Field()
  readonly subCategoryId!: string;
}