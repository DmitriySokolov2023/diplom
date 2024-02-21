//@ts-nocheck
import React, {useEffect, useState} from "react";
import {IGroup, IStudent} from "../types";
import {useQuery} from "@tanstack/react-query";
import {groupApi, studentsApi} from "../../api/api";
import {SelectChangeEvent} from "@mui/material/Select";
import s from "./s.module.scss";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import {CSVLink} from 'react-csv'
import {ReportPage4Supply} from "./report4Supply";
export const ReportPage4 = () => {

    const [group, setSelect] = useState('None')
    const [groupID, setGroupId] = useState('0')
    const [stat, setStat] = useState('None')


    const {data: groups} = useQuery({queryKey: ['gr2'], queryFn:  () => groupApi.getGroup<IGroup[]>()})
    const {data: st, refetch} = useQuery({queryKey: ['st2'], queryFn:  () => studentsApi.getByGroup<IStudent[]>({groupId:groupID})})


    useEffect(()=>{
        refetch()
    }, [stat])


    const handleChange2 = (event: SelectChangeEvent) => {
        setSelect(event.target.value);
    }


    return <>

            <div className={s.form} >

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">Выберете группу</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={group} label="Выберете группу" onChange={handleChange2}>
                        <MenuItem value="None" onClick={()=>{
                            setSelect('None')
                            setGroupId('0')
                        }}>
                            <em>Выберете группу</em>
                        </MenuItem>
                        {groups?.map(grp=>
                            <MenuItem
                                key={grp.id}
                                value={grp.title}
                                onClick={()=>{
                                    setSelect(grp.title)
                                    setGroupId(grp.id)
                                    setStat(grp.title)
                                }}
                            >{grp.title}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <div className={s.table}>
                  <ReportPage4Supply state={st} gr={stat}/>

                </div>
            </div>
    </>
}