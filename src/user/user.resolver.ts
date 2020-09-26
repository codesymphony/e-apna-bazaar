import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { UserDTO } from "./dto/user.dto";
import { AuthInfoDTO } from "./dto/auth-info.dto";
import { UserInput } from "./inputs/user.create.input";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Mutation(() => UserDTO)
  async signUp(
    @Args('input') input: UserInput
  ) {
    const result = await this.userService.signUpUser(input)

    return result
  }

  @Query(() => [UserDTO])
  async getAllUsers() {
    const result = await this.userService.getAllUsers()

    return result || []
  }

  @Query(() => AuthInfoDTO)
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const result = await this.userService.signIn(email, password)

    return result
  }

}