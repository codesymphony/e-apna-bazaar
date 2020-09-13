import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IdeaEntity } from "./idea.entity";
import { CreateUpdateInput } from "./inputs/idea.create.input";

@Injectable()
export class IdeaService {
  constructor(
   @InjectRepository(IdeaEntity)
   private ideaRepository: Repository<IdeaEntity>
  ) { }

  async getAllIdeas () {
    console.log('this func hit')
    const result = await this.ideaRepository.find({});

      console.log('sss', result)
    return result
  }

  async createIdea (data: CreateUpdateInput) {
    const idea = await this.ideaRepository.create(data)
    await this.ideaRepository.save(idea)

    return idea
  }

  async getIdeaById (id: string) {
    const result = await this.ideaRepository.findOne({where: { id } })
    
    return result
  }

  async updateIdea(id: string, data: CreateUpdateInput) {

    await this.ideaRepository.update({ id }, data)

    return await this.ideaRepository.findOne({ id })
  }

  async destroy(id: string) {
    await this.ideaRepository.delete({ id })

    return { deleted: true }
  }
}