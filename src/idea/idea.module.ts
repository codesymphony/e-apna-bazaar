import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IdeaEntity } from "./idea.entity";
import { IdeaResolver } from "./idea.resolver";
import { IdeaService } from "./idea.service";

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity])],
  providers: [IdeaResolver, IdeaService],
  exports: []
})

export class IdeaModule {}