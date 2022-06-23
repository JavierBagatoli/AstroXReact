//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Navbar = ({empleado, accion0, accion1, accion2}) => { 
  const [titular, setTitular] = useState("")

  useEffect(() => {
    if(empleado !== undefined){
      setTitular(empleado?.puesto + " " + empleado?.apellido)
    }else{
      setTitular("")
    }

  }, [empleado])

  const funcionesUsuario = () => {
    return (<>
      <div className='grid-item-tareas'>
        <h1 className="texto-nav aling-derecha" onClick={() => accion0()}>
          Tareas
        </h1>
      </div>
        
      <div className="grid-item-usuario">
        <h1 className="texto-nav aling-izquierda" onClick={() => accion1()}>
          {titular}
        </h1>
      </div>
      
      <div className='grid-item-salir'>
        <h1 className="texto-nav " onClick={() => accion2()}>
          Salir
        </h1>
      </div>
    </>)
  }

  const handlerNavbar = () => {
    return(<>
        <div className='grid-navbar'>
          <h1 className="texto-nav grid-item-astroX">
            Astro X
          </h1>
          {(empleado !== null) &&
            funcionesUsuario()
          }
        </div>
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