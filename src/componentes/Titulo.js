//Codigo creado por Javier Bagatoli el dia 01/06/2022
import React from 'react'
import {getDiaTitulo} from '../helpers/getDia'

const Titulo = ({sesionIniciada}) => {
  return (
    <h1 className='titulo-dia'>
        {sesionIniciada
            ? getDiaTitulo()
            : "Astro X"
        }
    </h1>
  )
}

export default Titulo