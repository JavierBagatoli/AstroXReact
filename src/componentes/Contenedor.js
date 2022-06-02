//Codigo creado por Javier Bagatoli el dia 02/06/2022

import React, { useEffect, useState } from 'react'
import { baseDatos } from './baseDatos/baseFalsa'
import CuerpoCentral from './CuerpoCentral'
import IniciarSesion from './inicio/IniciarSesion'
import Registrarse from './inicio/Registrarse'
import ListaTarjetas from './ListaTarjetas'
import Titulo from './Titulo'

const initialTareas = baseDatos[0]?.tareas;
const initialTareasCompeltas = baseDatos[0]?.tareasConcluidas;

const Contenedor = () => {
    const [sesionIniciada, setSesionIniciada] = useState(false)
    const [empleado, setEmpleado] = useState(-1)
    const [tareas, setTareas] = useState(initialTareas)
    const [tareasCompletas, setTareasCompletas] = useState(initialTareasCompeltas)

    const handleLogin = (number) =>{
        setSesionIniciada(true);
        setEmpleado(number)
    }

    const completarTarea = (tarea) => {
        let nuevasTareasCompletas = [...tareasCompletas, tarea];
        setTareasCompletas(nuevasTareasCompletas)

        let nuevasTareas = 
            tareas.filter(tareaBorrar => tareaBorrar.id !== tarea.id)
        setTareas(nuevasTareas);
    }

    const descompletarTarea = (tarea) => {
        let nuevasTareas = [...tareas, tarea];
        setTareas(nuevasTareas)

        let nuevasTareasCompletas =
            tareasCompletas.filter(tareaBorrar => tareaBorrar.id !== tarea.id)
        setTareasCompletas(nuevasTareasCompletas);
    }

    const eliminarTarea = (tarea) => {
        let nuevasTareasCompletas =
            tareasCompletas.filter(tareaBorrar => tareaBorrar.id !== tarea.id)
        setTareasCompletas(nuevasTareasCompletas);
    }

    const crearTarea = (tarea) =>{
        let nuevasTareas = [...tareas, tarea]
        setTareas(nuevasTareas)
    }

  return (
    <div >
        <p onClick={() => handleLogin(0)}>cambiar</p>
        <Titulo sesionIniciada={sesionIniciada}/>
        <div className='containerAstro'>
        {sesionIniciada
            ?
            <>
                <ListaTarjetas
                    tipo={null}
                    tareas={tareas}
                    funcionBoton={completarTarea}/>
                <CuerpoCentral
                    funcionBoton={crearTarea}/>
                <ListaTarjetas 
                    tipo={eliminarTarea}
                    tareas={tareasCompletas}
                    funcionBoton={descompletarTarea}/>
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