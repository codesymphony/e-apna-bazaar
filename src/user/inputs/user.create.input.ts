import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserInput {

  @Field()
  readonly email: string;

  @Field()
  readonly firstName: string

  @Field()
  readonly password: string

  @Field()
  readonly lastName: string

  @Field()
  readonly gender: string

  @Field({ nullable: true })
  readonly aadhaarNumber: string

  @Field({ nullable: true })
  readonly addressLine1: string

  @Field({ nullable: true })
  readonly addressLine2: string

  @Field({ nullable: true })
  readonly city: string

  @Field({ nullable: true })
  readonly state: string

  @Field({ nullable: true })
  readonly country: string

  @Field()
  readonly mobileNumber: string

}