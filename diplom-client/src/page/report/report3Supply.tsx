//@ts-nocheck
import React, {useEffect, useState} from "react";
import { IReportStatus} from "../types";
import {useQuery} from "@tanstack/react-query";
import {reportApi} from "../../api/api";
import {SelectChangeEvent} from "@mui/material/Select";
import s from "./s.module.scss";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {CSVLink} from 'react-csv'
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
export const Report3Supply = (props:any) => {

    let id = 1

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate =  day+ "/" + month + "/" + year;

    const [stat, setStat] = useState('None')
    const {data: status, refetch} = useQuery({queryKey: ['status3'], queryFn:  () => reportApi.getByStatusGruppa<IReportStatus[]>({status:stat, students:props.students})})

    useEffect(()=>{
        refetch()
    }, [stat])

    const handleChange1 = (event: SelectChangeEvent) => {
        setStat(event.target.value);
    }

    const report = [
        ['Учебная группа: ', props.gr],
        ['Статус: ',stat],
        ['',''],
        ['Кол-во: ',status?.length],
    ]

    return <>

        <FormControl fullWidth>
            <InputLabel id="spec-selected">Выберете статус</InputLabel>
            <Select labelId="spec-selected" id="spec-selected"  label="Выберете статус" value={stat} onChange={handleChange1}>
                <MenuItem value="None" onClick={()=>{
                    setStat('None')
                }}><em>Выберете статус</em></MenuItem>
                <MenuItem value="Трудоустроен" onClick={()=>{
                    setStat('Трудоустроен')
                }}>Трудоустроен</MenuItem>
                <MenuItem value="Самозанятый" onClick={()=>{
                    setStat('Самозанятый')
                }}>Самозанятый</MenuItem>
                <MenuItem value="ИП" onClick={()=>{
                    setStat('ИП')
                }}>ИП</MenuItem>
                <MenuItem value="ВУЗ" onClick={()=>{
                    setStat('ВУЗ')
                }}>ВУЗ</MenuItem>
                <MenuItem value="Срочная служба" onClick={()=>{
                    setStat('Срочная служба')
                }}>Срочная служба</MenuItem>
                <MenuItem value="Работает не официально" onClick={()=>{
                    setStat('Работает не официально')
                }}>Работает не официально</MenuItem>
                <MenuItem value="Не трудоустроен" onClick={()=>{
                    setStat('Не трудоустроен')
                }}>Не трудоустроен</MenuItem>
            </Select>
        </FormControl>


        <div className={s.table}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Фамилия</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Отчество</TableCell>
                            <TableCell>Организация</TableCell>
                            <TableCell>Профессия</TableCell>
                            <TableCell >По специальности</TableCell>
                            <TableCell >Статус</TableCell>
                            {status?.length > 0 &&
                                <TableCell >
                                    <CSVLink data={report} separator={";"} filename={`Отчет_ТУ_Группа_${props.gr} Статус_${stat}_${newDate}`}>
                                        <SimCardDownloadIcon/>
                                    </CSVLink>
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {status && status.map(stat =>(
                            <TableRow key={stat.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                <TableCell component="th" scope="row" >{id++}</TableCell>
                                <TableCell>{stat.students?.last_name}</TableCell>
                                <TableCell>{stat.students?.first_name}</TableCell>
                                <TableCell>{stat.students?.patronymic}</TableCell>
                                <TableCell>{stat.title_org}</TableCell>
                                <TableCell>{stat.profession}</TableCell>
                                <TableCell>{stat.by_speciality}</TableCell>
                                <TableCell>
                                    {stat.status =="ВУЗ" &&<p className={s.study}>{stat.status}</p>}
                                    {stat.status =="Срочная служба" && <p className={s.study}>{stat.status}</p>}
                                    {stat.status =="ИП" && <p className={s.work}>{stat.status}</p>}
                                    {stat.status =="Трудоустроен" && <p className={s.work}>{stat.status}</p>}
                                    {stat.status =="Самозанятый" && <p className={s.work}>{stat.status}</p>}
                                    {stat.status =="Не трудоустроен" && <p className={s.dontWork}>{stat.status}</p>}
                                    {stat.status =="Работает не официально" && <p className={s.dontWork}>{stat.status}</p>}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {status?.length > 0 &&
                <>
                    <h2>Отчет</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><span className={s.strong}>Учебная группа: {props.gr}</span></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><span className={s.strong}>Статус: {stat}</span></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Кол-во студентов: </TableCell>
                                    <TableCell><span className={s.strong}>{id-1}</span></TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
        </div>
    </>
}