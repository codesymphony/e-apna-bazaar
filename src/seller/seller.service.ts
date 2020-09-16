import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SellerEntity } from "./seller.identity";

@Injectable()
export class SellerService {
  constructor (
    @InjectRepository(SellerEntity)
    private sellerRepository: Repository<SellerEntity>
  ) { }

  async getAllSellersApi () {
    try {
      const result = this.sellerRepository.find()

      return result
    } catch (error) {
      console.log(error)
    }
  }


  async getSellerByIdApi (id: string) {
    try {
      const result = this.sellerRepository.findOne({where: {id}})

      return result
    } catch (error) {
      console.log(error)
    }
  }

  async createSeller (data) {
    try {
      const seller = this.sellerRepository.create(data)

      await this.sellerRepository.save(seller)

      return seller

    } catch (error) {
      console.log(error)
    }
  }

  async updateSeller (id, data) {
    try {
      await this.sellerRepository.update({id}, data)

      const result = await this.sellerRepository.findOne({id})

      return result

    } catch(error) {
      console.log(error)
    }
  }

  async deleteSeller (id) {
    try {
      await this.sellerRepository.delete({id})

      return {
        deleted: true
      }
    } catch (error) {
      console.log(error)
    }
  }
} 