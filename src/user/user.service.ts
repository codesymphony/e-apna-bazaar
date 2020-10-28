import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwsService } from '@/services/aws/aws.service';

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
      console.log(error);
    }
  }

  async signUpUser(data) {
    const { email, password } = data;
    try {

      const findExisted = await this._userRepository.findOne({ where: { email: email } });

      if (findExisted) {
        throw new HttpException('User with email already exists', HttpStatus.BAD_REQUEST);
      }
      else {
        const resultFromAws = await this._awsService.addUserToPool({ email, password });
        console.log('service', resultFromAws);
        const userData = Object.assign({}, data);
        delete userData.password;
        const user = this._userRepository.create(data);

        await this._userRepository.save(user);

        return user;
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signIn(email, password) {
    try {

      const findExisted = await this._userRepository.findOne({ where: { 'email': email } });

      const resultFromAws = await this._awsService.singIn({ email, password });

      return {
        user: findExisted,
        tokens: resultFromAws
      };
    }
    catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}