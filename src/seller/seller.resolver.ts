import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";

import { SellerDTO } from "./dto/seller.dto";
import { SellerInput } from "./inputs/seller.input";
import { SellerUpdate } from "./inputs/seller.update";
import { SellerService } from "./seller.service";

@Resolver()
export class SellerResolver {
  constructor (
    private sellerService: SellerService
  ) {  }

  @Query(() => [SellerDTO])
  async getAllSellers() {

    const result = this.sellerService.getAllSellersApi()

    return result
  }

  @Mutation(() => SellerDTO)
  async createSeller (
    @Args('input') input: SellerInput
  ) {
    const result = await this.sellerService.createSellerApi(input)

    return result
  }
  
  @Query(() => SellerDTO)
  async getSellerById (
    @Args('id') id: string
  ) {
    const result = await this.sellerService.getSellerByIdApi(id)

    return result
  }

  @Mutation(() => SellerDTO)
  async updateSeller (
    @Args('input') input: SellerUpdate
  )
   {
     const result = await this.sellerService.updateSellerApi(input)

     return result
   }
}