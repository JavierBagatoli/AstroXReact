//Codigo creado por Javier Bagatoli el dia 02/06/2022

import React, { useCallback, useEffect, useState } from 'react'
import { baseDatos } from './baseDatos/baseFalsa'
import CuerpoCentral from './CuerpoCentral'
import FormularioEntorno from './entorno/FormularioEntorno'
import DatosEditar from './inicio/DatosEditar'
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
        console.log(empleado)
    }

    const completarTarea = useCallback((tarea) => {
        let nuevasTareasCompletas = [...tareasCompletas, tarea];
        setTareasCompletas(nuevasTareasCompletas)

        let nuevasTareas = 
            tareas.filter(tareaBorrar => tareaBorrar.id !== tarea.id)
        setTareas(nuevasTareas);
    }, [tareas, tareasCompletas])

    const descompletarTarea = useCallback((tarea) => {
        let nuevasTareas = [...tareas, tarea];
        setTareas(nuevasTareas)

        let nuevasTareasCompletas =
            tareasCompletas.filter(tareaBorrar => tareaBorrar.id !== tarea.id)
        setTareasCompletas(nuevasTareasCompletas);
    }, [tareas, tareasCompletas])

    const eliminarTarea = useCallback((tarea) => {
        let nuevasTareasCompletas =
            tareasCompletas.filter(tareaBorrar => tareaBorrar.id !== tarea.id)
        setTareasCompletas(nuevasTareasCompletas);
    }, [tareasCompletas])

    const crearTarea = useCallback((tarea) =>{
        let nuevasTareas = [...tareas, tarea]
        setTareas(nuevasTareas)
    },[tareas])

    const menuTareas = () =>{
        return (
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
        )}
        
    const menuIniciar = () => {
        return (
            <>
                <Registrarse handleLogin={handleLogin}/>
                <div></div>
                <IniciarSesion handleLogin={handleLogin}/>
            </>
        )
    }

    const menuUsuario = () =>{
        let Empleado = baseDatos[empleado]
        console.log(baseDatos[empleado])
        console.log(Empleado)
        console.log(empleado)
        return(
            <>
                <DatosEditar
                    empleado={Empleado}/>
                <div></div>
                <FormularioEntorno
                    empleado={Empleado}/>
            </>
        )
    }

  return (
    <div >
        <p onClick={() => handleLogin(0)}>cambiar</p>
        <Titulo sesionIniciada={sesionIniciada}/>
        <div className='containerAstro'>
        {sesionIniciada
            ?
                menuUsuario()
            :
                menuIniciar()
        }
        </div>
    </div>
  )
}

export default Contenedor