import { Field, InputType, registerEnumType } from "@nestjs/graphql";

import { UserGenderEnum } from '../../types';

registerEnumType(UserGenderEnum, {
  name: 'UserGender',
});

@InputType()
export class UserInput {
  @Field()
  readonly email!: string;

  @Field()
  readonly firstName!: string

  @Field()
  readonly password!: string

  @Field()
  readonly lastName!: string

  @Field(() => UserGenderEnum)
  readonly gender!: UserGenderEnum

  @Field({ nullable: true })
  readonly aadhaarNumber!: string

  @Field({ nullable: true })
  readonly addressLine1!: string

  @Field({ nullable: true })
  readonly addressLine2!: string

  @Field({ nullable: true })
  readonly city!: string

  @Field({ nullable: true })
  readonly state!: string

  @Field({ nullable: true })
  readonly country!: string

  @Field()
  readonly mobileNumber!: string
}