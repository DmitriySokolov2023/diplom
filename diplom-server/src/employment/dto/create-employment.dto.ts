import {IsNumber, IsString} from "class-validator";

export class CreateEmploymentDto {

    @IsNumber()
    student_id: number;
    @IsString()
    title_org: string;
    @IsString()
    profession: string;
    @IsString()
    by_speciality: string;
    @IsString()
    status:string;

}