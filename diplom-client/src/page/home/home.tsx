//@ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { groupApi, specApi, studentsApi } from "../../api/api";
import { IGroup, ISpecialisation, IStudent, IStudentForm } from "../types";
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
import { useForm } from "react-hook-form";
import s from './s.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { InputLabel, FormControl } from "@mui/material/index";
import { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";


export const HomePage = () => {


   return (
      <div>
         <h2 className={s.title}>Добро пожаловать в web-приложение НАМТ | Занятость</h2>
         <div className={s.root}>
            <p><span className={s.strong}>НАМТ | Занятость</span> - современное web-приложение, созданное для организации ГБПОУ "НАМТ".</p>
            <p>Задача данного приложения обеспечить мониторинг трудоустройства выпускников и сделать этот процесс максимально простым, и информативным.</p>
         </div>
      </div>
   )
}