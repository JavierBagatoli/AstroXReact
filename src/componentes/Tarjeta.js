//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'

const Tarjeta = ({tarea, funcionBoton}) => {
  return (
    <div className='item-tarea'>
        <p>{tarea.nombre}</p>
        <button onClick={() => funcionBoton(tarea)} className='boton-tarea' title="Completará la tarea">Completar</button>
    </div>
  )
}

export default Tarjeta