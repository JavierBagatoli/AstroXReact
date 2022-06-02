//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef } from 'react'

const CuerpoCentral = ({funcionBoton}) => {
  const nombreRef = useRef("");
  const fechaRef = useRef("");

  const handleCrearTarea = () => {
    let nuevaTarea = {
      id: Date.now(),
      nombre: nombreRef.current.value,
      descripcion: "",
      fechaCreacion: fechaRef.current.value,
      fechaCompletdo: "",
      fechaLimite: ""
  }
  funcionBoton(nuevaTarea)
  }

  return (
    <div className='text-center'>
        <button className='boton-ambito-trabajo'>Ámbiente de trabajo</button>
        <article className='articulo art-tarea columna'>
            <h3 className='c1'>Crear tarea</h3>
            <input ref={nombreRef} className='input-agregar-tarea c2' type="text" placeholder="Nombre de tarea"></input>
            <label className="c3">Fecha finalizacion</label>
            <input ref={fechaRef}className='c4 input-agregar-tarea' type="date"></input>
            <button onClick={handleCrearTarea} className='c5  boton-agregar-tarea' >Crear</button>
        </article>
    </div>
  )
}

export default CuerpoCentral