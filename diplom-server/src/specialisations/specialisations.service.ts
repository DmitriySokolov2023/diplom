import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Students} from "../students/entity/students.entity";
import {Repository} from "typeorm";
import {CreateStudentsDto} from "../students/dto/create-students.dto";
import {Specialisations} from "./entity/specialisations.entity";
import {CreateSpecialisationsDto} from "./dto/create-specialisations.dto";

@Injectable()
export class SpecialisationsService {
    constructor(
        @InjectRepository(Specialisations)
        private specialisationsRepository: Repository<Specialisations>,
    ) {}


    findAll(){
        return this.specialisationsRepository.find({
            order:{
                title:'ASC'
            }
        })
    }

    findOne(id:number):Promise<Specialisations | null>{
        return this.specialisationsRepository.findOneBy({ id })
    }

    async create(specialisations: CreateSpecialisationsDto){
        return await this.specialisationsRepository.save(specialisations)
    }

    async update(id:number, specialisations:CreateSpecialisationsDto){
        return await this.specialisationsRepository.update(id, specialisations)
    }


    async remove(id:number){

        return await this.specialisationsRepository.delete(id)
    }

}
