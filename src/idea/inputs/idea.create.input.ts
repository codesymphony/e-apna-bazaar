import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUpdateInput {

  @Field()
  readonly idea: string;

  @Field()
  readonly desc: string;

}