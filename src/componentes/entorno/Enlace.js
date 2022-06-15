import React, { useRef } from 'react'

const Enlace = ({enlace}) => {
  const copiar = () => {
    navigator.clipboard.writeText(enlace.direccion)
  }

  return (
    <>
        <p className="p-enlaces">{enlace.direccion}</p>
        <button onClick={() => {copiar()}}>Copiar</button>
    </>

  )
}

export default Enlace