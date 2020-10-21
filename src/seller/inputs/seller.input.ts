import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SellerInput {
  @Field()
  readonly sellerCategory!: string;

  @Field()
  readonly description!: string

  @Field()
  readonly email!: string

  @Field()
  readonly mobileNumber!: string
}