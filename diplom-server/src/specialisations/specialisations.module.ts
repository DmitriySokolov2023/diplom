import { Module } from '@nestjs/common';
import { SpecialisationsController } from './specialisations.controller';
import { SpecialisationsService } from './specialisations.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Specialisations} from "./entity/specialisations.entity";


@Module({
  imports:[TypeOrmModule.forFeature([Specialisations])],
  controllers: [SpecialisationsController],
  providers: [SpecialisationsService]
})
export class SpecialisationsModule {}
