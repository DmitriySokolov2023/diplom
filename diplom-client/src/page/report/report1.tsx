//@ts-nocheck
import {IReportStatus} from "../types";
import {useQuery} from "@tanstack/react-query";
import {reportApi} from "../../api/api";
import s from "./s.module.scss";
import {CSVLink} from 'react-csv'

import {
    Paper,
    Select,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

export const ReportPage1 = () => {

    let id = 1
    let id2 = 0
    let trud = 0
    let ip = 0
    let vuz = 0
    let ss = 0
    let notrud = 0
    let neoff = 0
    let sz = 0

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate =  day+ "/" + month + "/" + year;

    const {data: status} = useQuery({queryKey: ['status'], queryFn:  () => reportApi.getAllEmploy<IReportStatus[]>({})})

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
        {Статус:'Студентов в статусе Трудоустроен', Итого:trud},
        {Статус:'Студентов в статусе Самозанятый', Итого:trud},
        {Статус:'Студентов в статусе ИП', Итого:ip},
        {Статус:'Студентов в статусе ВУЗ', Итого:vuz},
        {Статус:'Студентов в статусе Срочная служба', Итого:ss},
        {Статус:'Студентов в статусе Не трудоустроен', Итого:notrud},
        {Статус:'Студентов в статусе Работает не официально', Итого:neoff},
    ]



    return <>

        <div className={s.form}>
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
                                        <CSVLink data={report} separator={";"} filename={`Отчет_ТУ_Общий | ${newDate}`}>
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
                                        {stat.status =="ВУЗ" &&<p className={s.study}>{stat.status}</p> }
                                        {stat.status =="Срочная служба" && <p className={s.study}>{stat.status}</p>}
                                        {stat.status =="ИП" && <p className={s.work}>{stat.status}</p>}
                                        {stat.status =="Самозанятый" && <p className={s.work}>{stat.status}</p>}
                                        {stat.status =="Трудоустроен" && <p className={s.work}>{stat.status}</p>}
                                        {stat.status =="Не трудоустроен" && <p className={s.dontWork}>{stat.status}</p>}
                                        {stat.status =="Работает не официально" && <p className={s.dontWork}>{stat.status}</p>}
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2>Отчет</h2>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>

                        </TableHead>
                        <TableBody >
                            <TableRow >
                                <TableCell><span className={s.strong}>Общее количество студентов:</span></TableCell>
                                <TableCell><span className={s.strong}>{id-1}</span></TableCell>
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
            </div>

        </div>

        </>


}