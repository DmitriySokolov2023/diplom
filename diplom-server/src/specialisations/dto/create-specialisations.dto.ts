import {Column, PrimaryGeneratedColumn} from "typeorm";
import {IsNumber, IsString} from "class-validator";

export class CreateSpecialisationsDto {
    title:string;
}