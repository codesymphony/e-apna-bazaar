import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { IdeaService } from "./idea.service";

import { IdeaDTO } from './dto/idea.dto'

import { CreateUpdateInput } from "./inputs/idea.create.input";

@Resolver()
export class IdeaResolver {
  constructor(
    private ideaService: IdeaService
  ) { }

  @Query(() => [IdeaDTO])
  async getAllIdeas() {
    const result = await this.ideaService.getAllIdeas()

    return result
  }

  @Query(() => IdeaDTO)
  async ideaById (@Args('id') id: string) {
    const result = await this.ideaService.getIdeaById(id)
    
    return result
  }

  @Mutation(() => IdeaDTO)
  async newIdea(@Args('input') input: CreateUpdateInput) {

    const result = await this.ideaService.createIdea(input)

    return result
  }


}