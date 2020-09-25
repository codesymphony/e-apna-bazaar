import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLJSON } from 'graphql-type-json'

@ObjectType()
export class LoginDTO {

  @Field(type => GraphQLJSON)
  readonly user: any;

  @Field(type => GraphQLJSON)
  readonly tokens: any;

}