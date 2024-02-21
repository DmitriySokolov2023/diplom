import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {StudentsService} from "../students/students.service";
import {CreateStudentsDto} from "../students/dto/create-students.dto";
import {SpecialisationsService} from "./specialisations.service";
import {CreateSpecialisationsDto} from "./dto/create-specialisations.dto";

@Controller('specialisations')
export class SpecialisationsController {
    constructor(private readonly specialisationsService:SpecialisationsService) {
    }
    @Get()
    getAll(){
        return this.specialisationsService.findAll()
    }
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id:number){
        return this.specialisationsService.findOne(id)
    }

    @Post()
    create(@Body() specialisationsCreateDto:CreateSpecialisationsDto){
        return this.specialisationsService.create(specialisationsCreateDto)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() body:CreateSpecialisationsDto){
        return this.specialisationsService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        return this.specialisationsService.remove(id)
    }
}
