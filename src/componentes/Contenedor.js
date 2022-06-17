//Codigo creado por Javier Bagatoli el dia 02/06/2022

import React, { useCallback, useState } from 'react'
import { baseDatos } from './baseDatos/baseFalsa'
import CuerpoCentral from './CuerpoCentral'
import FormularioEntorno from './entorno/FormularioEntorno'
import DatosEditar from './inicio/DatosEditar'
import IniciarSesion from './inicio/IniciarSesion'
import Registrarse from './inicio/Registrarse'
import ListaTarjetas from './ListaTarjetas'
import Navbar from './Navbar'
import Titulo from './Titulo'
import Swal from 'sweetalert2'

const bcrypt = require('bcryptjs');

const initialTareas = baseDatos[0].tareas;
const initialTareasCompeltas = baseDatos[0].tareasConcluidas;

const Contenedor = () => {
    const [sesionIniciada, setSesionIniciada] = useState(false)
    const [baseDeDatos, setBaseDeDatos] = useState(baseDatos)
    const [empleadoPos, setEmpleadoPos] = useState(-1)
    const [tareas, setTareas] = useState(initialTareas)
    const [tareasCompletas, setTareasCompletas] = useState(initialTareasCompeltas)
    const [pagina, setPagina] = useState("")

    const handleRegistrar = (nuevoEmpleado) => {
        let NuevaBaseDeDatos = [...baseDeDatos , nuevoEmpleado]
        setBaseDeDatos(NuevaBaseDeDatos)
    }

    const handleLogin = (mail, password) =>{
        let personaIdentificada = baseDeDatos.find(persona => persona.mail === mail)
            if (personaIdentificada !== undefined){
                if (bcrypt.compareSync(password, personaIdentificada.contrasenia)){
                    setSesionIniciada(true);
                    let idEnBaseDeDatos = baseDeDatos.findIndex( empleado => empleado.id === personaIdentificada.id )
                    setEmpleadoPos(idEnBaseDeDatos)
                    }
                }
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

    const editarUsuario = useCallback((empleadoEditado) => {
        let baseDatosNueva = baseDeDatos.filter(empleado => empleado.id !== empleadoEditado.id)
        baseDatosNueva = [...baseDatosNueva, empleadoEditado]
        setBaseDeDatos(baseDatosNueva)
        setEmpleadoPos(baseDatosNueva.length-1)
    }, [baseDeDatos])

    const handleAbrirEntorno = useCallback(() =>{
        const apertura = baseDeDatos[empleadoPos].entorno.filter(
            entornoEmpleado => entornoEmpleado?.prioridad === true
        )
        apertura.map(entornoEmpleado => window.open(entornoEmpleado.direccion))

        Swal.fire({
            title: 'EntornoAbierto',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
    }, [empleadoPos, baseDeDatos])

    const menuTareas = () =>{
        return (
            <>
                <ListaTarjetas
                    tipo={null}
                    tareas={tareas}
                    funcionBoton={completarTarea}/>
                <CuerpoCentral
                    funcionBoton={crearTarea}
                    handleAbrirEntorno={handleAbrirEntorno}/>
                <ListaTarjetas 
                    tipo={eliminarTarea}
                    tareas={tareasCompletas}
                    funcionBoton={descompletarTarea}/>
            </>
        )}
        
    const menuIniciar = () => {
        return (
            <>
                <Registrarse handleRegistrar={handleRegistrar}/>
                <div>
                </div>
                <IniciarSesion handleLogin={handleLogin}/>
            </>
        )
    }

    const cerrarSesion = () => {
        setSesionIniciada(false)
        setEmpleadoPos(-1)
        handleNavbar()
    }
    const configuarEmpleado = () => {
        setPagina("configuarEmpleado")
    }
    const mostrarTareas = () => {
        setPagina("mostrarTareas")
    }

    const handleNavbar = () => {
        return (<>
            <Navbar
                empleado={baseDeDatos[empleadoPos]}
                accion0={mostrarTareas}
                accion1={configuarEmpleado}
                accion2={cerrarSesion}/>
        </>)
    }

    const menuUsuario = () =>{
        let EmpleadoActivo = baseDeDatos[empleadoPos]
        return(
            <>
                <DatosEditar
                    empleado={EmpleadoActivo}
                    handleEditar={editarUsuario}/>
                <div></div>
                <FormularioEntorno
                    empleado={EmpleadoActivo}/>
            </>
        )
        }
    
  return (
    <div >
        {handleNavbar()}
        <Titulo sesionIniciada={sesionIniciada}/>
        <div className='containerAstro'>
        {sesionIniciada
            ?
                pagina === "configuarEmpleado" ? menuUsuario()  :menuTareas()
            :
                menuIniciar()
        }
        </div>
    </div>
  )
}

export default Contenedor