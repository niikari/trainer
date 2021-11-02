import React, { useState } from 'react'
import Customers from './components/Customers';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Trainings from './components/Trainings';

function App() {

  const [show, setShow] = useState('one')

  const handleChange = (e, value) => {
      setShow(value)
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Training App            
          </Typography>
          <Tabs value={show} onChange={handleChange}>
              <Tab label="Customers" value="one" />
              <Tab label="Trainings" value="two" />
            </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
    {show === "one" && <Customers />}
    {show === "two" && <Trainings />}
    </div>
  );
}

export default App;
