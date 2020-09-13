import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class IdeaDTO {

  @Field()
  readonly id: string;

  @Field()
  readonly idea: string;

  @Field()
  readonly desc: string;

  @Field()
  readonly created: Date;
}