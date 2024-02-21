//@ts-nocheck
import s from './s.module.scss'
import React, {useState} from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import {ReportPage1} from "./report1";
import {ReportPage2} from "./report2";
import {ReportPage3} from "./report3";
import {ReportPage4} from "./report4";
import {ReportPage5} from "./report5";



export const ReportPage = () => {
    const [pick,setPick] = useState(0)
    const [report, setReport] = useState('None')

    const handleChange = (event: SelectChangeEvent) => {
        setReport(event.target.value);
    }
    return <div>
        <h2 className={s.title}>Запросы | Отчеты</h2>

        <div className={s.root}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Выберете тип отчета</InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={report}  label="Выберете тип отчета" onChange={handleChange}>
                    <MenuItem value="None" onClick={()=>setPick(0)}><em>Выберете тип отчета</em></MenuItem>
                    <MenuItem value="Отчет - общий" onClick={()=>setPick(1)}>Отчет - общий</MenuItem>
                    <MenuItem value="Отчет - по году выпуска" onClick={()=>setPick(5)}>Отчет - по году выпуска</MenuItem>
                    <MenuItem value="Отчет - по всем студентам из группы" onClick={()=>setPick(4)}>Отчет - по всем студентам из группы</MenuItem>
                    <MenuItem value="Отчет - по всем студентам по статусу" onClick={()=>setPick(2)}>Отчет - по всем студентам по статусу</MenuItem>
                    <MenuItem value="Отчет - по всем студентам из группы по статусу" onClick={()=>setPick(3)}>Отчет - по всем студентам из группы по статусу</MenuItem>


                </Select>
            </FormControl>
            {pick == 1 && <ReportPage1/>}
            {pick == 2 && <ReportPage2/>}
            {pick == 3 && <ReportPage3/>}
            {pick == 4 && <ReportPage4/>}
            {pick == 5 && <ReportPage5/>}
        </div>
    </div>

}