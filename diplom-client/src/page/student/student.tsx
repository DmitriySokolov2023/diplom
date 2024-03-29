//@ts-nocheck
import {useQuery} from "@tanstack/react-query";
import {groupApi, specApi, studentsApi} from "../../api/api";
import {IGroup, ISpecialisation, IStudent, IStudentForm} from "../types";
import {
    Button, dividerClasses, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import s from './s.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { InputLabel, FormControl  } from "@mui/material/index";
import { SelectChangeEvent } from '@mui/material/Select';
import {useEffect, useState} from "react";


export const StudentPage = () => {

    const [select, useSelect] = useState('None')
    const [sel, setSel] = useState('0')
    const [gr, setAge] = useState("");

    const {data: groups} = useQuery({queryKey: ['gr'], queryFn:  () => groupApi.getGroup<IGroup[]>()})
    const {data:studentGroup, refetch} = useQuery({queryKey: ['studGroup'],
        queryFn: () => studentsApi.getByGroup<IStudent[]>({groupId:sel})})


    const {register, handleSubmit} = useForm<IStudentForm>()
    let id = 1;



    useEffect(()=>{
        refetch()
    }, [select])

    const onSubmit = async (data:IStudentForm)=>{
        await studentsApi.create(data)
        refetch()
    }

    const onDelete= async (id:string)=>{
        await studentsApi.del(id)
        refetch()
    }


    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    }


    return (
        <div>
            <h2 className={s.title}>Студенты</h2>
            <div className={s.root}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Выберете группу</InputLabel>
                        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" {...register('group_id')} value={select} label="Выберете группу" onChange={handleChange}>
                            <MenuItem onClick={()=>{
                                useSelect('None')
                                setSel('0')
                            }} value="None">
                                <em>Выберете группу</em>
                            </MenuItem>
                            {groups?.map(grp=>
                                <MenuItem
                                    key={grp.id}
                                    value={grp.id}
                                    onClick={()=>{
                                        useSelect(grp.id)
                                        setSel(grp.id)
                                    }}
                                >{grp.title +" | "+grp.title_spec}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <TextField id="outlined-basic" {...register('last_name')} label="Фамилия" variant="outlined"/>
                    <TextField id="outlined-basic" {...register('first_name')} label="Имя" variant="outlined" />
                    <TextField id="outlined-basic" {...register('patronymic')} label="Отчество" variant="outlined" />
                    <TextField id="outlined-basic" {...register('phone')} label="Телефон" variant="outlined" />
                    <TextField  id="outlined-basic" {...register('parents_phone')} label="Телефон родителя" variant="outlined" />


                    <Button type="submit" variant="outlined">Добавить студента</Button>
                </form>

                <div className={s.table}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell>Фамилия</TableCell>
                                    <TableCell>Имя</TableCell>
                                    <TableCell >Отчество</TableCell>
                                    <TableCell >Телефон</TableCell>
                                    <TableCell >Телефон родителей</TableCell>
                                    <TableCell >Группа</TableCell>
                                    <TableCell >Направление</TableCell>
                                    <TableCell ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {studentGroup && studentGroup.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row" >{id++}</TableCell>
                                        <TableCell> {row.last_name}</TableCell>
                                        <TableCell >{row.first_name}</TableCell>
                                        <TableCell >{row.patronymic}</TableCell>
                                        <TableCell >{row.phone}</TableCell>
                                        <TableCell >{row.parents_phone}</TableCell>
                                        <TableCell >{row.groups?.title}</TableCell>
                                        <TableCell >{row.groups?.title_spec}</TableCell>
                                        <TableCell onClick={()=>onDelete(row.id)}><DeleteIcon /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}