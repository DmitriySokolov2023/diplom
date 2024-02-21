import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Students} from "../students/entity/students.entity";
import {Repository} from "typeorm";
import {Users} from "./entities/user.entity";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UsersService {

  constructor(
      @InjectRepository(Users)
      private usersRepository: Repository<Users>
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findById(id: number) {
    return this.usersRepository.findOneBy({id});
  }
  findByCond(cond:LoginUserDto) {
    return this.usersRepository.findOneBy(cond);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
