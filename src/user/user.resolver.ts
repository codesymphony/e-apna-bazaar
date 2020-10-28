import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserDTO } from './dto/user.dto';
import { LoginDTO } from './dto/userLogin.dto';
import { UserInput } from './inputs/user.create.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly _userService: UserService
  ) {
  }

  @Mutation(() => UserDTO)
  async signUp(
    @Args('input') input: UserInput
  ) {
    const result = await this._userService.signUpUser(input);

    return result;
  }

  @Query(() => [UserDTO])
  async getAllUsers() {
    const result = await this._userService.getAllUsers();

    return result;
  }

  @Mutation(() => LoginDTO)
  async signin(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const result = await this._userService.signIn(email, password);

    console.log(result);
    return result;
  }
}