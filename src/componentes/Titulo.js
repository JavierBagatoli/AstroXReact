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