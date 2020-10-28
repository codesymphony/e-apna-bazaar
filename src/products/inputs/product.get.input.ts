import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductGetInput {
  @Field()
  readonly productId!: string;
}