import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import omit from 'lodash/omit';

import { AwsService } from '@/services/aws/aws.service';
import { makeError } from '@/utils';
import { USER_ERRORS } from '@/errors';

import { CreateUserInput } from './inputs/user.create.input';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _awsService: AwsService
  ) { }

  async getAllUsers() {
    try {
      const result = await this._userRepository.find();

      return result;
    } catch (error) {
      throw makeError(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const existing = await this._userRepository.findOne({ where: { email } });

      if (!existing) {
        throw new HttpException(USER_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return existing;
    } catch (error) {
      throw makeError(error);
    }
  }

  async signUpUser(input: CreateUserInput) {
    const { email, password } = input;

    try {
      const existing = await this._userRepository.findOne({ where: { email: email } });

      if (existing) {
        throw new HttpException(USER_ERRORS.ALREADY_EXISTS_WITH_EMAIL, HttpStatus.BAD_REQUEST);
      }

      await this._awsService.addUserToPool({ email, password });

      const user = this._userRepository.create(omit(input, 'password'));

      await this._userRepository.save(user);

      return user;
    } catch (error) {
      throw makeError(error);
    }
  }

  async signInUser(email, password) {
    try {
      const existing = await this.findByEmail(email);

      const resultFromAws = await this._awsService.signIn({ email, password });

      existing.isVerified = true;

      await this._userRepository.save(existing);

      return {
        user: existing,
        tokens: resultFromAws
      };
    } catch (error) {
      throw makeError(error);
    }
  }
}