//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'

const TarjetaCompletada = ({tarea, funcionBoton, funcionEliminar}) => {
  
  return (
    <div  className='item-tarea'>
        <p>{tarea.nombre}</p>
        <button onClick={() => funcionEliminar(tarea)} className=''>Eliminar</button>
        <br/>
        <button onClick={() => funcionBoton(tarea)} className='boton-tarea'>Descompletar</button>
    </div>
  )
}

export default TarjetaCompletada