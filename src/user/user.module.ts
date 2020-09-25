import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AwsModule } from "src/services/aws/aws.module";
import { UserEntity } from "./user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AwsModule],
  providers: [UserResolver, UserService],
  exports: []
})

export class UserModule { }