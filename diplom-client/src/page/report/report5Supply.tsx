//@ts-nocheck
import React, {useEffect, useState} from "react";
import {IStudent} from "../types";
import {useQuery} from "@tanstack/react-query";
import {studentsApi} from "../../api/api";

import {ReportPage5Finally} from "./report5Finally";
export const ReportPage5Supply = (props:any) => {

    const {data: status, refetch} = useQuery({queryKey: ['statusInYear'], queryFn:  () => studentsApi.getByGroup<IStudent[]>({groupId:grProp})})
    const st = status
    const year = props.ye

    let grProp = ''
    let stId = '0'
    let studentsId = []

    if(props.grp){
        grProp = props.grp
    }

    if(st){
        studentsId = st?.map(stud => stud.id)
        if (studentsId && studentsId.join().length === 0){
            stId = '0'
        }
        else stId = studentsId.join()
    }
    console.log(stId)
    useEffect(()=>{
        refetch()
    }, [props])

    return <>
        <ReportPage5Finally studentId={stId} title={props.title} ye={year}/>
    </>
}