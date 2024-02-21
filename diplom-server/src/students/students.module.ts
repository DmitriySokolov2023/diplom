import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import {Students} from "./entity/students.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {StudentsController} from "./students.controller";

@Module({
  imports:[TypeOrmModule.forFeature([Students])],
  providers: [StudentsService],
  controllers:[StudentsController],
  exports:[StudentsService]
})
export class StudentsModule {}
