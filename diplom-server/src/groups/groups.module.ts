import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Groups} from "../groups/entity/groups.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Groups])],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}
