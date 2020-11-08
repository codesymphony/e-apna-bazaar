import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './seller/seller.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      installSubscriptionHandlers: true,
      introspection: true,
      autoSchemaFile: 'schema.gql',
      context: async ({ req: request, res: response }) => {
        return ({
          request,
          response,
          headers: (request && request.headers) || { },
        });
      },
    }),
    TypeOrmModule.forRoot(),
    SellerModule,
    UserModule,
    CategoryModule,
    SubCategoryModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
