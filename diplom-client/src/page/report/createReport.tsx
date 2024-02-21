//@ts-nocheck
import React from 'react'
import { CSVLink } from 'react-csv'
import {Button} from "@mui/material";
export const CreateReport = ({csvData, fileName}) => {
    return (
        <Button variant="warning">
            <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
        </Button>
    )
}