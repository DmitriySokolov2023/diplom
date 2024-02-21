import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put, Query
} from '@nestjs/common';
import {StudentsService} from "../students/students.service";
import {CreateEmploymentDto} from "./dto/create-employment.dto";
import {EmploymentService} from "./employment.service";
import {SearchStudentsDto} from "../students/dto/search-students.dto";
import {
    SearchEmploymentDto,
    SearchEmploymentStat,
    SearchEmploymentStatusDto,
    SearchEmploymentStud
} from "./dto/search-employment.dto";

@Controller('employment')
export class EmploymentController {
    constructor(private readonly employmentService:EmploymentService, private readonly studentsService:StudentsService) {
    }
    @Get()
    getAll(){
        return this.employmentService.findAll()
    }
    @Get('/special')
    findByStId(@Query() dto:SearchEmploymentDto){
        return this.employmentService.findByStudentId(dto)
    }
    @Get('/status')
    findByStStatus(@Query() dto:SearchEmploymentStatusDto){
        return this.employmentService.findByStudentStatus(dto)
    }
    @Get('/stat')
    findBySt(@Query() dto:SearchEmploymentStat){
        return this.employmentService.findByStatus(dto)
    }
    @Get('/students')
    findByStudents(@Query() dto:SearchEmploymentStud){
        return this.employmentService.findByStudents(dto)
    }
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id:number){
        return this.employmentService.findOne(id)
    }

    @Post()
    async create(@Body() createEmploymentDto:CreateEmploymentDto){
            if(!(await this.studentsService.findOne(createEmploymentDto.student_id))){
                throw new NotFoundException()
            }
        return await this.employmentService.create(createEmploymentDto)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() body:CreateEmploymentDto){
        return this.employmentService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        return this.employmentService.remove(id)
    }
}
