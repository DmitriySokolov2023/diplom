import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe, Patch,
    Post,
    Put, Query,
} from '@nestjs/common';
import {StudentsService} from "./students.service";
import {CreateStudentsDto} from "./dto/create-students.dto";
import {SearchStudentsDto} from "./dto/search-students.dto";

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService:StudentsService) {
    }
    @Get()
    getAll(){
        return this.studentsService.findAll()
    }
    @Get('/group')
    sortByGroup(@Query() dto:SearchStudentsDto){
        return this.studentsService.findByGroup(dto)
    }
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id:number){
        return this.studentsService.findOne(id)
    }
    @Post()
    create(@Body() createStudentsDto:CreateStudentsDto){
        return this.studentsService.create(createStudentsDto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() body:CreateStudentsDto){
        return this.studentsService.update(id, body)
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        return this.studentsService.remove(id)
    }
}
