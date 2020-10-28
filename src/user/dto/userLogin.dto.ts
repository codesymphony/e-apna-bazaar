import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class LoginDTO {
  @Field(() => GraphQLJSON)
  readonly user: any;

  @Field(() => GraphQLJSON)
  readonly tokens: any;
}