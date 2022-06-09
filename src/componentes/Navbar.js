//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Navbar = ({empleado, accion0, accion1, accion2}) => { 
  

  const funcionesUsuario = () => {
    return (<>
      <Grid xs={3}>
        <Typography m={2} className="navbar-brand texto-nav" variant="h5" color="initial" onClick={() => accion1()}>Persona</Typography>
      </Grid>
      <Grid xs={6}>
        <Typography m={2} className="navbar-brand texto-nav" variant="h5" color="initial" onClick={() => accion2()}>Salir</Typography>
      </Grid>
    </>)
  }

  const handlerNavbar = () => {
    return(<>
    
           <Grid xs={3}>
            <Typography m={2} className="navbar-brand texto-nav" variant="h4" color="initial" onClick={() => accion0()}>Astro X</Typography>
          </Grid>
          {(empleado !== -1) &&
            funcionesUsuario()
          }
    </>)
  }
  return (
    <>  
      <Box sx={{
        height: 68,
        backgroundColor: 'primary.dark',}}
        bgcolor="secondary"
        className="gradiente">
        <Grid container spacing={1} xs={12}>
        
              {handlerNavbar()}    
        </Grid>            
      </Box>
    </>
    
  )
}

export default Navbar