//Codigo creado por Javier Bagatoli el dia 02/06/2022

import React, { useCallback, useState } from 'react'
import CuerpoCentral from './CuerpoCentral'
import FormularioEntorno from './entorno/FormularioEntorno'
import DatosEditar from './inicio/DatosEditar'
import IniciarSesion from './inicio/IniciarSesion'
import Registrarse from './inicio/Registrarse'
import ListaTarjetas from './ListaTarjetas'
import Navbar from './Navbar'
import Titulo from './Titulo'
import Swal from 'sweetalert2'
import * as servicio from "./servicios/empleadoService"
import * as tareaServicio from "./servicios/tareasServicio"


const Contenedor = () => {
    const [sesionIniciada, setSesionIniciada] = useState(false)
    const [baseDeDatos, setBaseDeDatos] = useState([])
    const [empleado, setEmpleado] = useState(null)
    const [tareas, setTareas] = useState([])
    const [tareasCompletas, setTareasCompletas] = useState([])
    const [pagina, setPagina] = useState("")

    const handleRegistrar = (nuevoEmpleado) => {
        let NuevaBaseDeDatos = [...baseDeDatos , nuevoEmpleado]
        servicio.registrarEmpleado(nuevoEmpleado)
        setBaseDeDatos(NuevaBaseDeDatos)
    }

    const handleLogin = async(mail, contraseña) =>{
        const empleado = await servicio.getEmpleado(mail, contraseña)
        console.log(empleado.respuesta)
        if (empleado?.respuesta === "Error al iniciar sesión" ){
            Swal.fire({
                title: 'Datos incorrectos',
                text: empleado.respuesta,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        }else{
            setSesionIniciada(true);
            setEmpleado(empleado)
            let listaTareas = empleado.tareas
            let tareasPendientes = listaTareas.filter(tarea => tarea.fechaCompletado === null || tarea.fechaCompletado === 0)
            let tareasCompletadas = listaTareas.filter(tarea => tarea.fechaCompletado !== null && tarea.fechaCompletado !== 0)
            setTareas(tareasPendientes)
            setTareasCompletas(tareasCompletadas)  
        }
               
                
    }

    const completarTarea = useCallback((tarea) => {
        tareaServicio.completarTarea(tarea, empleado.mail)
        let tareaCompletada = tarea;
        tareaCompletada.fechaCompletado = Date.now()
        let nuevasTareasCompletas = [...tareasCompletas, tareaCompletada];
        setTareasCompletas(nuevasTareasCompletas)
        
        let nuevasTareas = 
            tareas.filter(tareaBorrar => tareaBorrar.fechaCreacion !== tarea.fechaCreacion)
        setTareas(nuevasTareas);
    }, [tareas, tareasCompletas, empleado])

    const descompletarTarea = useCallback((tarea) => {
        tareaServicio.descompletarTarea(tarea, empleado.mail)
        let tareaCompletada = tarea;
        tareaCompletada.fechaCompletado = 0
        let nuevasTareas = [...tareas, tareaCompletada];
        setTareas(nuevasTareas)

        let nuevasTareasCompletas =
            tareasCompletas.filter(tareaBorrar => tareaBorrar.fechaCreacion !== tarea.fechaCreacion)
        setTareasCompletas(nuevasTareasCompletas);

    }, [tareas, tareasCompletas, empleado])

    const eliminarTarea = useCallback((tarea) => {
        tareaServicio.quitarTarea(tarea, empleado.mail)
        let nuevasTareasCompletas =
            tareasCompletas.filter(tareaBorrar => tareaBorrar.fechaCreacion !== tarea.fechaCreacion)
        setTareasCompletas(nuevasTareasCompletas);
    }, [tareasCompletas, empleado])

    const crearTarea = useCallback((tarea) =>{
        tareaServicio.agregarTarea(tarea, empleado.mail)
        let nuevasTareas = [...tareas, tarea]
        setTareas(nuevasTareas)

    },[tareas, empleado])

    const editarUsuario = useCallback((empleadoEditado) => {
        

        let baseDatosNueva = baseDeDatos.filter(empleado => empleado.id !== empleadoEditado.id)
        baseDatosNueva = [...baseDatosNueva, empleadoEditado]
        setBaseDeDatos(baseDatosNueva)
    }, [baseDeDatos])

    const handleAbrirEntorno = useCallback(() =>{
        const apertura = empleado.entorno.filter(
            entornoEmpleado => entornoEmpleado?.prioridad === true
        )
        apertura.map(entornoEmpleado => window.open(entornoEmpleado.direccion))

        Swal.fire({
            title: 'EntornoAbierto',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
    }, [empleado])

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
        setEmpleado(null)
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
                empleado={empleado}
                accion0={mostrarTareas}
                accion1={configuarEmpleado}
                accion2={cerrarSesion}/>
        </>)
    }

    const menuUsuario = () =>{
        let EmpleadoActivo = empleado
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
                pagina === "configuarEmpleado" ? menuUsuario()  : menuTareas()
            :
                menuIniciar()
        }
        </div>
    </div>
  )
}

export default Contenedor