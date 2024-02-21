import { Module } from '@nestjs/common';
import { EmploymentController } from './employment.controller';
import { EmploymentService } from './employment.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Employment} from "./entity/employement.entity";

import {StudentsService} from "../students/students.service";
import {StudentsModule} from "../students/students.module";


@Module({
  imports:[TypeOrmModule.forFeature([Employment]), StudentsModule],
  controllers: [EmploymentController],
  providers: [EmploymentService]
})
export class EmploymentModule {}
