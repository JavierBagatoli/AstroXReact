//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Navbar = ({empleado, accion0, accion1, accion2}) => { 
  

  const funcionesUsuario = () => {
    return (<>
      <Grid container ml={10} item xs={6}>
        <Grid item xs={2}>
          <Typography m={2} className="navbar-brand texto-nav grid-item-tareas" variant="h5" color="initial" onClick={() => accion0()}>Tareas</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography m={2} className="navbar-brand texto-nav grid-item-usuario" variant="h5" color="initial" onClick={() => accion1()}>Persona</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography m={2} className="navbar-brand texto-nav grid-item-salir" variant="h5" color="initial" onClick={() => accion2()}>Salir</Typography>
        </Grid>
      </Grid>
    </>)
  }

  const handlerNavbar = () => {
    return(<>
    
           <Grid>
            <Typography m={2} className="navbar-brand texto-nav grid-item-astroX" variant="h4" color="initial">Astro X</Typography>
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
        <Grid container spacing={1}>
        
              {handlerNavbar()}    
        </Grid>            
      </Box>
    </>
    
  )
}

export default Navbar