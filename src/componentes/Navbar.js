//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Navbar = ({accion0, accion1, accion2}) => {
  return (
    <>  
      <Box sx={{
        height: 68,
        backgroundColor: 'primary.dark',}}
        bgcolor="secondary"
        className="gradiente">
        <Grid container spacing={1} xs={12}>
        
          <Grid xs={3}>
            <Typography m={2} className="navbar-brand" variant="h4" color="initial" onClick={() => accion0()}>Astro X</Typography>
          </Grid>
          <Grid xs={3}>
            <Typography m={2} className="navbar-brand" variant="h5" color="initial" onClick={() => accion1()}>Persona</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography m={2} className="navbar-brand" variant="h5" color="initial" onClick={() => accion2()}>Salir</Typography>
          </Grid>
        </Grid>            
      </Box>
    </>
    
  )
}

export default Navbar