import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, JoinTable} from 'typeorm';
import {Groups} from "../../groups/entity/groups.entity";
import {Specialisations} from "../../specialisations/entity/specialisations.entity";

@Entity()
export class Students {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    last_name: string;
    @Column()
    first_name: string;
    @Column()
    patronymic: string;
    @ManyToOne(() => Groups, groups => groups.id,{
        cascade:false,
        nullable:false,

    })
    @JoinColumn({name:"group_id"})
    groups:Groups

    @Column()
    phone: string;
    @Column()
    parents_phone: string;
}