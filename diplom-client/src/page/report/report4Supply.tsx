//@ts-nocheck
import React, {useEffect} from "react";
import { IReportStatus} from "../types";
import {useQuery} from "@tanstack/react-query";
import { reportApi} from "../../api/api";
import s from "./s.module.scss";
import {
    Paper,
    Select,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {CSVLink} from 'react-csv'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
export const ReportPage4Supply = (props:any) => {

    const st = props.state
    let stId = '0'
    let studentsId = []

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate =  day+ "/" + month + "/" + year;

    let id2 = 0
    let trud = 0
    let sz = 0
    let ip = 0
    let vuz = 0
    let ss = 0
    let notrud = 0
    let neoff = 0

    if(st){
        studentsId = st?.map(stud => stud.id)
        if (studentsId && studentsId.join().length === 0){
            stId = '0'
        }
        else stId = studentsId.join()
    }




    const {data: status, refetch} = useQuery({queryKey: ['status2'], queryFn:  () => reportApi.getByGruppa<IReportStatus[]>({students:stId})})


    useEffect(()=>{
        refetch()
    }, [props])

    let id = 1

    status?.map(st =>{
        id2=id2+1
        if (st.status =="ВУЗ"){
            vuz = vuz+1
        }
        if (st.status =="Срочная служба"){
            ss = ss+1
        }
        if (st.status =="ИП"){
            ip = ip+1
        }
        if (st.status =="Трудоустроен"){
            trud = trud+1
        }
        if (st.status =="Не трудоустроен"){
            notrud = notrud+1
        }
        if (st.status =="Работает не официально"){
            neoff = neoff+1
        }
        if (st.status =="Самозанятый"){
            sz = sz+1
        }
    })

    const report = [
        ['Группа', props.gr],
        ['', ''],
        ['Студентов в статусе Трудоустроен', trud],
        ['Студентов в статусе Самозанятый', sz],
        ['Студентов в статусе ИП', ip],
        ['Студентов в статусе ВУЗ', vuz],
        ['Студентов в статусе Срочная служба', ss],
        ['Студентов в статусе Не трудоустроен', notrud],
        ['Студентов в статусе Работает не официально', neoff],
    ]

    return <>


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
                                        <TableCell>
                                            <CSVLink data={report} separator={";"} filename={`Отчет_ТУ_Группа_${props.gr} | ${newDate}`}>
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

                    {id2 != 0 &&
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
                                            <TableCell>Кол-во студентов со статусом: </TableCell>
                                            <TableCell><span className={s.strong}>{id2}</span></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Студентов в статусе <span className={s.strong}>Трудоустроен:</span></TableCell>
                                            <TableCell>{trud}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Студентов в статусе <span className={s.strong}>Самозанятый:</span></TableCell>
                                            <TableCell>{sz}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Студентов в статусе <span className={s.strong}>ИП:</span></TableCell>
                                            <TableCell>{ip}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Студентов в статусе <span className={s.strong}>ВУЗ:</span></TableCell>
                                            <TableCell>{vuz}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Студентов в статусе <span className={s.strong}>Срочная служба:</span></TableCell>
                                            <TableCell>{ss}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Студентов в статусе <span className={s.strong}>Не трудоустроен:</span></TableCell>
                                            <TableCell>{notrud}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Студентов в статусе <span className={s.strong}>Работает не официально:</span></TableCell>
                                            <TableCell>{neoff}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    }
                </div>

    </>
}