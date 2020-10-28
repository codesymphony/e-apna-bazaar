import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserDTO } from './dto/user.dto';
import { LoginDTO } from './dto/userLogin.dto';
import { CreateUserInput } from './inputs/user.create.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly _userService: UserService
  ) {
  }

  @Mutation(() => UserDTO)
  async signUpUser(
    @Args('input') input: CreateUserInput
  ) {
    const result = await this._userService.signUpUser(input);

    return result;
  }

  @Query(() => [UserDTO])
  async getAllUsers() {
    const result = await this._userService.getAllUsers();

    return result;
  }

  @Query(() => LoginDTO)
  async signInUser(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const result = await this._userService.signInUser(email, password);

    return result;
  }
}