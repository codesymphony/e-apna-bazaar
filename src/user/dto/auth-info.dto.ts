import { Field, ObjectType } from '@nestjs/graphql';

import { UserDTO } from './user.dto';

@ObjectType()
class TokensDTO {
  @Field()
  readonly idToken!: string;

  @Field()
  readonly refreshToken!: string;

  @Field()
  readonly accessToken!: string;
}

@ObjectType()
export class AuthInfoDTO {
  @Field(() => UserDTO)
  readonly user!: UserDTO;

  @Field(() => TokensDTO)
  readonly tokens!: TokensDTO;
}