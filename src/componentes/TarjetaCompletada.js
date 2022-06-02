import React from 'react'

const TarjetaCompletada = ({nombre}) => {
  return (
    <div  className='item-tarea'>
        <p>{nombre}</p>
        <button className='boton-tarea'>Eliminar</button>
        <button className='boton-tarea'>Descompletar</button>
    </div>
  )
}

export default TarjetaCompletada