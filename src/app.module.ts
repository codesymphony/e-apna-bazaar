import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IdeaModule } from './idea/idea.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    TypeOrmModule.forRoot(),
    IdeaModule,
    SellerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
