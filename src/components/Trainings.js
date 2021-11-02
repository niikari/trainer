import React, { useEffect, useState } from "react";
import {AgGridReact} from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Trainings() {

    const [trainings, setTrainings] = useState([])

    useEffect(() => fetchTrainings(), [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(res => res.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const deleteTraining = (url) => {
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                fetchTrainings()
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'date', width: 300},
        {field: 'duration'},
        {field: 'activity'},
        {
            width: 60,
            cellRendererFramework: params => <Button onClick={() => deleteTraining(params.data.links[0].href)} startIcon={<DeleteIcon color="error" />}/>
        }
    ]

    return (
        <>
        <div className="ag-theme-material" style={{height: 660, width: 800, margin: 'auto', marginTop: 20}}>
           <AgGridReact 
                rowData={trainings}
                columnDefs={columns}
           />
        </div>
        </>
    )
}