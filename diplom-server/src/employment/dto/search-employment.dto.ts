import {IsNumber, IsString} from "class-validator";

export class SearchEmploymentDto {

    @IsNumber()
    studentID: number;
}

export class SearchEmploymentStatusDto {

    @IsString()
    status: string;
    @IsString()
    students:string;
}


export class SearchEmploymentStat {
    @IsString()
    status: string;
}

export class SearchEmploymentStud {
    @IsString()
    students: string;
}