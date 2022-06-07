//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'
import EliminarSVG from '../svg/eliminar.svg'
import LapizSVG from '../svg/lapiz.svg'

const TarjetaCompletada = ({tarea, funcionBoton, funcionEliminar}) => {
  
  return (
    <div  className='item-tarea'>
        <p>{tarea.nombre}</p>
        <button onClick={() => funcionEliminar(tarea)} className='boton-eliminar-tarea' title="Eliminar Permanente">
          <img className="svg" src={EliminarSVG}></img>
        </button>
        <button onClick={() => funcionBoton(tarea)} className='boton-tarea' title="Descompletar">
          <img className="svg" src={LapizSVG}></img>
        </button>
    </div>
  )
}

export default TarjetaCompletada