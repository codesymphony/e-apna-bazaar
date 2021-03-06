import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CategoryDeleteInput {
  @Field()
  readonly categoryId!: string;
}