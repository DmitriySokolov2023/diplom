import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Employment} from "./entity/employement.entity";
import {CreateEmploymentDto} from "./dto/create-employment.dto";
import {
    SearchEmploymentDto,
    SearchEmploymentStat,
    SearchEmploymentStatusDto,
    SearchEmploymentStud
} from "./dto/search-employment.dto";

@Injectable()
export class EmploymentService {
    constructor(
        @InjectRepository(Employment)
        private employmentRepository: Repository<Employment>,
    ) {}

    async findAll(){
        const employStud = this.employmentRepository.createQueryBuilder('emplSt')
                .leftJoinAndSelect('emplSt.students','student_id')
        return await employStud.getMany()

        // return this.employmentRepository.find()
    }
    async findByStudentId(dto:SearchEmploymentDto){
        const employStud = this.employmentRepository.createQueryBuilder('emplSt')
            if(dto.studentID){
                employStud
                .leftJoinAndSelect('emplSt.students','student_id')
                    .where('emplSt.student_id = :student_id', {student_id:dto.studentID})
            }
            return await employStud.getMany()

    }

    async findByStudentStatus(dto:SearchEmploymentStatusDto){

        const employStud = this.employmentRepository.createQueryBuilder('emplStatus')
        if(dto.status){
            employStud
                .leftJoinAndSelect('emplStatus.students','student_id')
                .where('emplStatus.status = :status', {status:dto.status})
                .andWhere(`emplStatus.student_id in (${dto.students})`)


        }
        return await employStud.getMany()
    }
    async findByStatus(dto:SearchEmploymentStat){
        const employStatus = this.employmentRepository.createQueryBuilder('emplStatusAll')
        if(dto.status){
            employStatus
                .leftJoinAndSelect('emplStatusAll.students','student_id')
                .where('emplStatusAll.status = :status', {status:dto.status})
        }
        return await employStatus.getMany()
    }

    async findByStudents(dto:SearchEmploymentStud){
        const employStatus = this.employmentRepository.createQueryBuilder('emplStud')
        if(dto.students){
            employStatus
                .leftJoinAndSelect('emplStud.students','student_id')
                .where(`emplStud.student_id in (${dto.students})`)
        }
        return await employStatus.getMany()
    }

    findOne(id:number):Promise<Employment | null>{
        return this.employmentRepository.findOneBy({ id })
    }

    async create(employment: CreateEmploymentDto){
        return  this.employmentRepository.save({
                title_org:employment.title_org,
                profession:employment.profession,
                by_speciality:employment.by_speciality,
                students:{id: employment.student_id},
                status: employment.status
            }
        )
    }

    async update(id:number, employment:CreateEmploymentDto){
        return await this.employmentRepository.update(id, employment)
    }


    async remove(id:number){
        return await this.employmentRepository.delete(id)
    }

}
