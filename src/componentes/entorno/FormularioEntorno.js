import React from 'react'
import Enlace from './Enlace'

const FormularioEntorno = ({empleado}) => {
  console.log(empleado)
  return (
    <article className='articulo'>
      <h1>Entorno laboral</h1>
        {empleado &&
          empleado.entorno.map((enlace, index) => <Enlace enlace={enlace} key={index}/>)
        }
    </article>
  )
}

export default FormularioEntorno