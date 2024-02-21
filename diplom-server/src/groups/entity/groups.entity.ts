import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';


@Entity()
export class Groups {
    @PrimaryGeneratedColumn()
    id: number;

   @Column()
    title:string;

   @Column()
    title_spec: string;

    @Column()
    director: string;

    @Column()
    date: string;

}