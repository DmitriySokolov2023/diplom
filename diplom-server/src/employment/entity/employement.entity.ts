import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne} from 'typeorm';
import {IsInt, IsString} from "class-validator";
import {Students} from "../../students/entity/students.entity";

@Entity('employment')
export class Employment {
    @PrimaryGeneratedColumn()
    id: number;


   @ManyToOne(type => Students,{
       onDelete:'CASCADE'
   })
   @JoinColumn({name:"student_id"})
   students:Students



    @Column()
    title_org: string;
    @Column()
    profession: string;
    @Column()
    by_speciality: string;
    @Column()
    status:string;

}