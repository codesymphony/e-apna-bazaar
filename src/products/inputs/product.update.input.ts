import { Field, InputType } from '@nestjs/graphql';

import { ProductCreateInput } from './product.create.input';

@InputType()
export class ProductUpdateInput {
  @Field()
  readonly productId!: string;

  @Field()
  readonly productInfo!: ProductCreateInput;
}