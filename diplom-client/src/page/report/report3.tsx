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
import {Report3Supply} from "./report3Supply";
export const ReportPage3 = () => {
    const [group, setSelect] = useState('None')
    const [groupID, setGroupId] = useState('0')

    const {data: groups} = useQuery({queryKey: ['gr1'], queryFn:  () => groupApi.getGroup<IGroup[]>()})
    const {data: st, refetch} = useQuery({queryKey: ['st1'], queryFn:  () => studentsApi.getByGroup<IStudent[]>({groupId:groupID})})

    let stId = '0'
    if(st){
        let studentsId = st?.map(stud => stud.id)
        if (studentsId.join().length === 0){
            stId = '0'
        }
        else stId = studentsId.join()
    }

    useEffect(()=>{
        refetch()
    }, [groupID])

    const handleChange2 = (event: SelectChangeEvent) => {
        setSelect(event.target.value);
    }


    return <>
            <div className={s.form}>
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
                                }}
                            >{grp.title}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <Report3Supply students = {stId} gr={group}/>
            </div>
    </>

}