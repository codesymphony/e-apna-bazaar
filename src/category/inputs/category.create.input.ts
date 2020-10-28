import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CategoryCreateInput {
  @Field()
  readonly categoryName!: string;
}