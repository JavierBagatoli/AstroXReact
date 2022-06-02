import React from 'react'

const CuerpoCentral = () => {
  return (
    <div className='text-center'>
        <button className='boton-ambito-trabajo'>Ámbiente de trabajo</button>
        <article className='articulo art-tarea columna'>
            <h3 className='c1'>Crear tarea</h3>
            <input className='input-agregar-tarea c2' type="text" placeholder="Nombre de tarea"></input>
            <label className="c3">Fecha finalizacion</label>
            <input className='c4 input-agregar-tarea' type="date"></input>
            <button className='c5  boton-agregar-tarea' >Crear</button>
        </article>
    </div>
  )
}

export default CuerpoCentral