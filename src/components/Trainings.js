import React, { useEffect, useState } from "react";
import {AgGridReact} from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs'

export default function Trainings() {

    const [trainings, setTrainings] = useState([])

    // SNACKBAR JA VIESTI SNACKBARIIN ALKAA
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
  
      setOpen(false)
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      )

    // SNACKBAR LOPPUU

    useEffect(() => fetchTrainings(), [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => {
                if (res.ok) {
                    fetchTrainings()
                    setMsg('Training deleted')
                    setOpen(true)
                }
            })
            .catch(err => console.error(err))
        }        
    }

    const columns = [
        {
            field: 'date', valueFormatter: (params) => {
              return dayjs(params.value).format('DD:MM:YYYY hh:mm')
            }, 
            width: 300, 
            filter: true, 
            floatingFilter: true, 
            sortable: true
        },
        {field: 'duration', filter: true, floatingFilter: true, sortable: true},
        {field: 'activity', filter: true, floatingFilter: true, sortable: true},      
        {
            headerName: "Trainer",
            cellRendererFramework: params => params.data.customer.firstname + " " + params.data.customer.lastname
        }, 
        {
            width: 60,
            cellRendererFramework: params => <Button onClick={() => deleteTraining(params)} startIcon={<DeleteIcon color="error" />}/>
        }
        
    ]

    return (
        <>
        <div className="ag-theme-material" style={{height: 660, width: 1000, margin: 'auto', marginTop: 20}}>
           <AgGridReact 
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                animateRows={true}
                suppressCellSelection={true}
                />
        </div>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        action={action}
        />
        </>
    )
}