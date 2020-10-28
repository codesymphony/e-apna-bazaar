import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SellerEntity } from './seller.entity';

@Injectable()
export class SellerService {
  constructor (
    @InjectRepository(SellerEntity)
    private _sellerRepository: Repository<SellerEntity>
  ) { }

  async getAllSellersApi () {
    try {
      const result = this._sellerRepository.find();

      return result;
    } catch (error) {
      console.log(error);
    }
  }


  async getSellerByIdApi (id: string) {
    try {
      const result = this._sellerRepository.findOne({where: {id}});

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createSellerApi (data) {
    try {
      const seller = this._sellerRepository.create(data);

      await this._sellerRepository.save(seller);

      return seller;

    } catch (error) {
      console.log(error);
    }
  }

  async updateSellerApi (data) {

    const { id, info} = data;
    try {
      await this._sellerRepository.update({id}, info);

      const result = await this._sellerRepository.findOne({id});

      return result;

    } catch(error) {
      console.log(error);
    }
  }

  async deleteSellerApi (id) {
    try {
      await this._sellerRepository.delete({id});

      return {
        deleted: true
      };
    } catch (error) {
      console.log(error);
    }
  }
} 