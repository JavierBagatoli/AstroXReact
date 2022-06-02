import React, { useState } from 'react'
import { baseDatos } from './baseDatos/baseFalsa'
import CuerpoCentral from './CuerpoCentral'
import IniciarSesion from './inicio/IniciarSesion'
import Registrarse from './inicio/Registrarse'
import ListaTarjetas from './ListaTarjetas'
import Titulo from './Titulo'

const Contenedor = () => {
    const [sesionIniciada, setSesionIniciada] = useState(false)
    const [empleado, setEmpleado] = useState(-1)
  

    const handleLogin = (number) =>{
        setSesionIniciada(true);
        setEmpleado(number)
    }

    let tareasCompletas = baseDatos[empleado]?.tareas;
    let tareas = baseDatos[empleado]?.tareasConcluidas;
  return (
    <div >
        <p onClick={() => handleLogin(0)}>cambiar</p>
        <Titulo sesionIniciada={sesionIniciada}/>
        <div className='containerAstro'>
        {sesionIniciada
            ?
            <>
                <ListaTarjetas
                    tipo={false}
                    tareas={tareas}/>
                <CuerpoCentral/>
                <ListaTarjetas 
                    tipo={true}
                    tareas={tareasCompletas}/>
            </>

            :
            <>
                <Registrarse handleLogin={handleLogin}/>
                <div></div>
                <IniciarSesion handleLogin={handleLogin}/>
            </>
        }
        </div>
    </div>
  )
}

export default Contenedor