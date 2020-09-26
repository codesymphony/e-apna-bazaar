import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AwsService } from "src/services/aws/aws.service";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly awsService: AwsService
  ) { }

  async getAllUsers() {
    try {
      const result = await this.userRepository.find()

      return result
    } catch (error) {
      console.log(error)
    }
  }

  async signUpUser(data) {
    const { email, password } = data
  
    try {

      const findExisted = await this.userRepository.findOne({ where: { email: email } })

      if (findExisted) {
        throw new HttpException('User with email already exists', HttpStatus.BAD_REQUEST)
      }

      else {
        const resultFromAws = await this.awsService.addUserToPool({ email, password })
        console.log('service', resultFromAws)

        const userData = Object.assign({}, data)
        delete userData.password
        const user = this.userRepository.create(data)

        await this.userRepository.save(user)

        return user
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async signIn(email: string, password: string) {
    try {
      const findExisted = await this.userRepository.findOne({ where: { "email": email } })

      if (!findExisted) {
        throw new HttpException('User with email does not exist', HttpStatus.NOT_FOUND)
      }

      const resultFromAws = await this.awsService.signIn({ email, password })

      return {
        user: findExisted,
        tokens: resultFromAws
      }
    }
    catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}