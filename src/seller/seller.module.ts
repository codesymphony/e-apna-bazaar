import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SellerEntity } from "./seller.entity";
import { SellerResolver } from "./seller.resolver";
import { SellerService } from "./seller.service";

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity])],
  providers: [SellerResolver, SellerService],
  exports: []
})

export class SellerModule {}