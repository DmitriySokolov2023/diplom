import {
    BadRequestException,
    Delete,
    Get,
    HttpException,
    Injectable,
    NotFoundException,
    ParseIntPipe,
    Post
} from '@nestjs/common';
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Students} from "./entity/students.entity";
import {CreateStudentsDto} from "./dto/create-students.dto";
import {SearchStudentsDto} from "./dto/search-students.dto";

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Students)
        private studentsRepository: Repository<Students>
    ) {}


    async findAll(){
        const allStudent = await this.studentsRepository.createQueryBuilder('allSt')
            .leftJoinAndSelect(`allSt.groups`, 'group_id')
            .leftJoinAndSelect(`allSt.specialisations`, 'spec_id')
            .where('allSt.group_id IS NOT NULL')
            .andWhere('allSt.spec_id IS NOT NULL')

        // const allStudent = await this.studentsRepository.find()
        if(!allStudent){
            throw new NotFoundException('Студенты не найдены!')
        }
        return allStudent.getMany()
    }

    async findOne(id:number){
        const oneStudent = await this.studentsRepository.findOneBy({ id })
        if(!oneStudent){
            throw new NotFoundException('Студент не найден!')
        }
        return oneStudent
    }

    async findByGroup(dto:SearchStudentsDto){
        const qb =  this.studentsRepository.createQueryBuilder('obg',)

        if(dto.groupId){
            qb
                .leftJoinAndSelect('obg.groups','group_id')
                // .leftJoinAndSelect('obg.specialisations','spec_id')
                .where(`obg.group_id in (${dto.groupId})`)
                .orderBy('obg.last_name', 'ASC')
                // .andWhere(`obg.spec_id IS NOT NULL` )
        }

        return await qb.getMany()
    }
    create(students: CreateStudentsDto){
        return  this.studentsRepository.save(
            {
                last_name:students.last_name,
                first_name:students.first_name,
                patronymic:students.patronymic,
                phone:students.phone,
                parents_phone:students.parents_phone,
                groups:{id: students.group_id},
                // specialisations:{id: students.spec_id}
            }
        )
    }
   async update(id:number, students:CreateStudentsDto){
       const oneStudent = await this.studentsRepository.findOneBy({id})
       if(!oneStudent){
           throw new NotFoundException('Студент не найден!')
       }
       return await this.studentsRepository.update(id, students)
    }

    async remove(id:number){
        const oneStudent = await this.studentsRepository.findOneBy({id})
        if(!oneStudent){
            throw new NotFoundException('Студент не найден!')
        }
        return await this.studentsRepository.delete(id)
    }



}
