//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef } from 'react'
import TransitionsModal from './tareas/TransitionsModal'

const CuerpoCentral = ({funcionBoton}) => {

  return (
    <div className='text-center'>
        <button className='boton-ambito-trabajo'>Ámbiente de trabajo</button>
        <article className='articulo art-tarea columna'>
            <TransitionsModal
              funcionBoton={funcionBoton}/>
        </article>
    </div>
  )
}

export default CuerpoCentral