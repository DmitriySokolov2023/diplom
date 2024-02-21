//@ts-nocheck
import React, {useEffect, useState} from 'react'
import {
    FormControl,
    InputLabel, MenuItem,
    Select,
} from "@mui/material";
import s from "./s.module.scss";

import {SelectChangeEvent} from "@mui/material/Select";
import {useQuery} from "@tanstack/react-query";
import {groupApi} from "../../api/api";
import {IGroup} from "../types";
import {ReportPage5Supply} from "./report5Supply";


export const ReportPage5 = () => {


    const [year, setYear] = useState('None')
    const [state, setState] = useState('0')

    const {data: group, refetch} = useQuery({queryKey: ['grIn'], queryFn:  () => groupApi.getGroupIn<IGroup[]>({date:state})})

    let groupTitle = ''
    let groupDirector = ''
    if(group){
        groupTitle = (group?.map(grp => grp.title + ' - ' + grp.director + ' | ')).join('')
    }

    console.log(groupDirector)


    let gr = '0'
    if(group){
        let groupIn = group?.map(grp => grp.id)
        if (groupIn.join().length === 0){
            gr = '0'
        }
        else gr = groupIn.join()
    }

    useEffect(()=>{
        refetch()
    }, [year])


    const handleChange1 = (event: SelectChangeEvent) => {
        setYear(event.target.value);
        setState(event.target.value)
    }
    const yearSet = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030']
    console.log(yearSet)
    return (
        <>

            <div className={s.form}>
                <FormControl fullWidth>
                    <InputLabel id="spec-selected">Выберете год выпуска</InputLabel>
                    <Select labelId="spec-selected" id="spec-selected"  label="Выберете год выпуска" value={year} onChange={handleChange1}>
                        <MenuItem value="None" onClick={()=>{
                            setYear('None')
                            setState('0')
                        }}><em>Выберете год выпуска</em></MenuItem>
                        {yearSet?.map((ye,index) =>
                            <MenuItem
                                key={index}
                                value={ye}
                            >{ye}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                {state != 0 && <ReportPage5Supply grp={gr} title={groupTitle}  ye={year}/>}
            </div>
        </>
    )
}