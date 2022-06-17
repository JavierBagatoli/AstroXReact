import React from 'react'
import Swal from 'sweetalert2'


const Enlace = ({enlace}) => {

  const copiar = () => {
    navigator.clipboard.writeText(enlace.direccion)
    Swal.fire({
      title: 'Enlace copiado',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
  }

  return (
    <>
      <div className='item-tarea'>
        <p className="p-enlaces item1">{enlace.apodo}</p>
        <button className="boton item2" onClick={() => {copiar()}}>Copiar</button>
      </div>
    </>

  )
}

export default Enlace