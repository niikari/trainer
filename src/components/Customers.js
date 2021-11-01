import React, { useEffect, useRef, useState } from "react";
import {AgGridReact} from 'ag-grid-react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

export default function Customers() {

    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({})

    const gridRef = useRef()

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

    const editStarts = () => {
        setCustomer(gridRef.current.getSelectedNodes()[0].data)
    }

    useEffect(() => fetchCustomers(), [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(data => setCustomers(data.content))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(res => {
            if (res.ok) {
                fetchCustomers()
                setMsg('Customer added')
                setOpen(true)
            }
        })
        .catch(err => console.error(err))
    }

    const editCustomer = () => {
        fetch(customer.links[0].href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => {
            if (res.ok) {
                fetchCustomers()
                setMsg('Customer edited')
                setOpen(true)
            }
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (customerUrl) => {
        if (window.confirm('Are you sure?')) {
            fetch(customerUrl, {
                method: 'DELETE'
            })
            .then(res => {
                if (res.ok) {
                    fetchCustomers()
                    setMsg('Customer deleted')
                    setOpen(true)
                }
            })
        }
    }

    const addTrainingToCustomer = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => {
            if (res.ok) {
                fetchCustomers()
                setMsg('Training added to customer')
                setOpen(true)
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'firstname', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'lastname', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'streetaddress', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'postcode', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'city', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'email', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'phone', filter: true, sortable: true, floatingFilter: true, editable: true},        
        {
            width: 60,
            cellRendererFramework: params => <AddTraining addTraining={addTrainingToCustomer} customer={params.data} />
        },
        {
            width: 60,
            cellRendererFramework: params => <Button onClick={() => deleteCustomer(params.data.links[0].href)} startIcon={<DeleteIcon color="error"/>}></Button>
        }

    ]

    return (
        <>
        <AddCustomer addCustomer={addCustomer}/>
        <div className="ag-theme-material" style={{height: 640, width: '100%'}}>
           <AgGridReact
               rowData={customers}
               columnDefs={columns}
               pagination={true}
               paginationPageSize={10}
               suppressCellSelection={true}
               animateRows={true}
               onGridReady={params => gridRef.current = params.api}
               rowSelection="single"
               onCellEditingStarted={editStarts}
               onCellEditingStopped={editCustomer}>               
           </AgGridReact>
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