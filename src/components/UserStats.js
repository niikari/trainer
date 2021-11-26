import React, { useState } from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UserStatsChart from "./UserStatsChart";

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
                <UserStatsChart userTrainings={userTrainings} />
            
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