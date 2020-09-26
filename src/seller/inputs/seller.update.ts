import { Field, InputType } from "@nestjs/graphql";

import { SellerInput } from "./seller.input";

@InputType()
export class SellerUpdate {
  @Field()
  readonly id: string;

  @Field()
  readonly info: SellerInput;
}