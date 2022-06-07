//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'

const Navbar = ({accion0, accion1, accion2}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark estilo-nav">
        <div className="container-fluid">
            <a className="navbar-brand" href="#" onClick={() => accion0()}>Astro X</a>
            <a className="navbar-brand" href="#" onClick={() => accion1()}>Configurar</a>
            <a className="navbar-brand" href="#" onClick={() => accion2()}>Salir</a>
        </div>
        </nav>
  )
}

export default Navbar