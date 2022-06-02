import React from 'react'

const Tarjeta = ({nombre}) => {
  return (
    <div className='item-tarea'>
        <p>{nombre}</p>
        <button className='boton-tarea' title="Completará la tarea">Completar</button>
    </div>
  )
}

export default Tarjeta