import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany} from 'typeorm';


@Entity()
export class Specialisations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

}