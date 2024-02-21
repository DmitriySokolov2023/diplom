import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {GroupsService} from "./groups.service";
import {CreateGroupsDto} from "./dto/create-groups.dto";
import {SearchGroupsDto} from "./dto/search-groups.dto";

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService:GroupsService) {
    }
    @Get()
    getAll(){
        return this.groupsService.findAll()
    }
    @Get('/gr')
    getSome(@Query() dto:SearchGroupsDto){
        return this.groupsService.findSomeGroup(dto)
    }
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id:number){
        return this.groupsService.findOne(id)
    }

    @Post()
    create(@Body() createGroupsDto:CreateGroupsDto){
        return this.groupsService.create(createGroupsDto)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() body:CreateGroupsDto){
        return this.groupsService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        return this.groupsService.remove(id)
    }
}
