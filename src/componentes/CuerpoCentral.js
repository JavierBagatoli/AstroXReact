//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef } from 'react'
import TransitionsModal from './tareas/TransitionsModal'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const CuerpoCentral = ({funcionBoton}) => {

  return (
    <div className='text-center'>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        wrap="nowrap"
      >
        <Grid centered>
          <Button variant="contained" color="primary">
            coasas
          </Button>
          <Button variant="contained" color="primary">
            coasas
          </Button>
        </Grid>
      </Grid>

      <Grid container>
      <button className='boton-ambito-trabajo'>Ámbiente de trabajo</button>
      </Grid>
        


        
        <article className='articulo art-tarea columna'>
            <TransitionsModal
              funcionBoton={funcionBoton}
              centered/>
        </article>
    </div>
  )
}

export default CuerpoCentral