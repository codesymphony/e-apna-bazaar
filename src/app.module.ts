import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SellerModule } from './seller/seller.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subCategory/subCategory.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    TypeOrmModule.forRoot(),
    SellerModule,
    UserModule,
    CategoryModule,
    SubCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
