import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SubCategoryInput {

  @Field()
  readonly subCategoryName: string;

}