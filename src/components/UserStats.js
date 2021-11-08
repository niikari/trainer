import React, { useState } from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function UserStats(props) {

    const [userTrainings, setUserTrainings] = useState([])
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        fetchCustomerTrainings()
        setOpen(true)
    }
  
    const handleClose = () => {
      setOpen(false);
    }

    const fetchCustomerTrainings = () => {
        fetch(props.customer.links[2].href)
        .then(res => res.json())
        .then(data => setUserTrainings(data.content))
        .catch(err => console.error(err))
    }

    return (
        <>
        <Button color="warning" onClick={handleClickOpen} startIcon={<QueryStatsIcon />} />
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {`${props.customer.firstname} ${props.customer.lastname} training stats`}
            </DialogTitle>
            <DialogContent>
                <BarChart                                               
                    width={500}
                    height={500}
                    data={userTrainings}
                    margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="activity" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar barSize={80}  dataKey="duration" fill="#82ca9d" />
                    <YAxis />
                </BarChart>
            
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                Close
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}