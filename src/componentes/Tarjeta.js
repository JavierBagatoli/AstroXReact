//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'
import CheckSVG from '../svg/check.svg'

const Tarjeta = ({tarea, funcionBoton}) => {
  return (
    <div className='item-tarea'>
        <p>{tarea.nombre}</p>
        <button onClick={() => funcionBoton(tarea)} className='boton-tarea' title="Completará la tarea">
          <img className='svg' src={CheckSVG}></img>  
        </button>
    </div>
  )
}

export default Tarjeta