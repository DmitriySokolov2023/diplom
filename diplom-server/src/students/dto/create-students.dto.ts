
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateStudentsDto{

    @IsString()
    last_name: string;
    @IsString()
    first_name: string;
    @IsString()
    patronymic: string;

    @IsNumber()
    @IsNotEmpty()
    group_id: number;

    // @IsString()
    // @IsNotEmpty()
    // spec_id: number;

    @IsString()
    phone: string;
    @IsString()
    parents_phone: string;

}