//Codigo creado por Javier Bagatoli el dia 02/06/2022

import React, { useCallback, useState } from "react";
import CuerpoCentral from "./CuerpoCentral";
import ListaEnlaces from "./entorno/ListaEnlaces";
import IniciarSesion from "./formulariosEmpleado/IniciarSesion";
import ListaTarjetas from "./ListaTarjetas";
import Navbar from "./Navbar";
import Titulo from "./Titulo";
import Swal from "sweetalert2";
import * as servicio from "./servicios/empleadoService";
import * as tareaServicio from "./servicios/tareasServicio";
import * as enlaceServicio from "./servicios/enlaceServicio";
import ModalRegistrarse from "./formulariosEmpleado/ModalRegistrarse";
import ModalEditar from "./formulariosEmpleado/ModalEditar";
import ModalCrearEnlace from "./entorno/ModalCrearEnlace";
import withReactContent from "sweetalert2-react-content";

const Contenedor = () => {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [empleado, setEmpleado] = useState(null);
  const [tareas, setTareas] = useState([]);
  const [tareasCompletas, setTareasCompletas] = useState([]);
  const [pagina, setPagina] = useState("");

  const MySwal = withReactContent(Swal);

  //Tratamiento del empleado
  const handleRegistrar = (nuevoEmpleado) => {
    servicio.registrarEmpleado(nuevoEmpleado);
  };

  const handleLogin = async (mail, contraseña) => {
    const empleado = await servicio.getEmpleado(mail, contraseña);
    if (empleado?.respuesta === "Error al iniciar sesión") {
      Swal.fire({
        title: "Datos incorrectos",
        text: empleado.respuesta,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } else {
      setSesionIniciada(true);
      setEmpleado(empleado);
      let listaTareas = empleado.tareas;
      let tareasPendientes = listaTareas.filter(
        (tarea) => tarea.fechaCompletado === null || tarea.fechaCompletado === 0
      );
      let tareasCompletadas = listaTareas.filter(
        (tarea) => tarea.fechaCompletado !== null && tarea.fechaCompletado !== 0
      );
      setTareas(tareasPendientes);
      setTareasCompletas(tareasCompletadas);
    }
  };

  const editarUsuario = useCallback(
    async (empleadoEditado) => {
      const resEdit = await servicio.editarEmpleado(empleadoEditado);
      setEmpleado(empleadoEditado);

      if (resEdit.data.message === "Empleado actualizado") {
        MySwal.fire({
          text: "Actualización exitosa",
          icon: "success",
          background: "#3f1a2b",
          color: "white",
          confirmButtonText: "Entendido",
          showCloseButton: "true",
        });
      } else {
        MySwal.fire({
          text: "Actualización fallida",
          icon: "error",
          background: "#3f1a2b",
          color: "white",
          confirmButtonText: "Entendido",
          showCloseButton: "true",
        });
      }
    },
    [MySwal]
  );

  const handleActualizarContraseña = async (nuevaContraseña) => {
    await servicio.actualizarContraseña(nuevaContraseña, empleado);
    alert("activado");
  };

  const cerrarSesion = () => {
    setSesionIniciada(false);
    setEmpleado(null);
    handleNavbar();
  };

  //Tratamiento de enlaces
  const agregarEnlace = (nuevoEnlace) => {
    let listaEnlaces = empleado.entorno;
    if (nuevoEnlace.prioridad) {
      const cantidad = listaEnlaces.filter(
        (enlace) => enlace.prioridad === true
      );

      if (cantidad.length <= 3) {
        enlaceServicio.agregarEnlace(nuevoEnlace, empleado.mail);
        listaEnlaces = [...listaEnlaces, nuevoEnlace];
        agregarEnlaces(listaEnlaces);
      } else {
        MySwal.fire({
          text: "No se pueden agregar más de tres enlaces con apertura rápida",
          icon: "error",
          background: "#3f1a2b",
          color: "white",
          confirmButtonText: "Entendido",
          showCloseButton: "true",
        });
      }
    } else {
      enlaceServicio.agregarEnlace(nuevoEnlace, empleado.mail);
      listaEnlaces = [...listaEnlaces, nuevoEnlace];
      agregarEnlaces(listaEnlaces);
    }
  };

  const agregarEnlaces = useCallback(
    (listaEnlaces) => {
      let nuevoEmpleado = empleado;
      nuevoEmpleado.entorno = listaEnlaces;
      setEmpleado(nuevoEmpleado);
    },
    [empleado]
  );

  const eliminarEnlace = useCallback(
    (enlace) => {
      enlaceServicio.eliminarEnlace(enlace, empleado.mail);
      const nuevaListaEnlaces = empleado.entorno.filter(
        (enlaceAnteriores) => enlaceAnteriores.id !== enlace.id
      );

      let empleadoActualizado = empleado;
      empleadoActualizado.entorno = nuevaListaEnlaces;
      setEmpleado(empleadoActualizado);
    },
    [empleado]
  );

  //Tratamiento de tareas
  const completarTarea = useCallback(
    (tarea) => {
      tareaServicio.completarTarea(tarea, empleado.mail);
      let tareaCompletada = tarea;
      tareaCompletada.fechaCompletado = Date.now();
      let nuevasTareasCompletas = [...tareasCompletas, tareaCompletada];
      setTareasCompletas(nuevasTareasCompletas);

      let nuevasTareas = tareas.filter(
        (tareaBorrar) => tareaBorrar.fechaCreacion !== tarea.fechaCreacion
      );
      setTareas(nuevasTareas);
    },
    [tareas, tareasCompletas, empleado]
  );

  const descompletarTarea = useCallback(
    (tarea) => {
      tareaServicio.descompletarTarea(tarea, empleado.mail);
      let tareaCompletada = tarea;
      tareaCompletada.fechaCompletado = 0;
      let nuevasTareas = [...tareas, tareaCompletada];
      setTareas(nuevasTareas);

      let nuevasTareasCompletas = tareasCompletas.filter(
        (tareaBorrar) => tareaBorrar.fechaCreacion !== tarea.fechaCreacion
      );
      setTareasCompletas(nuevasTareasCompletas);
    },
    [tareas, tareasCompletas, empleado]
  );

  const eliminarTarea = useCallback(
    (tarea) => {
      tareaServicio.quitarTarea(tarea, empleado.mail);
      let nuevasTareasCompletas = tareasCompletas.filter(
        (tareaBorrar) => tareaBorrar.fechaCreacion !== tarea.fechaCreacion
      );
      setTareasCompletas(nuevasTareasCompletas);
    },
    [tareasCompletas, empleado]
  );

  const crearTarea = useCallback(
    (tarea) => {
      tareaServicio.agregarTarea(tarea, empleado.mail);
      let nuevasTareas = [...tareas, tarea];
      setTareas(nuevasTareas);
    },
    [tareas, empleado]
  );

  //Funciones de la pagina

  const handleAbrirEntorno = useCallback(() => {
    const apertura = empleado.entorno.filter(
      (entornoEmpleado) => entornoEmpleado?.prioridad === true
    );
    apertura.map((entornoEmpleado) => window.open(entornoEmpleado.direccion));

    Swal.fire({
      title: "EntornoAbierto",
      icon: "success",
      background: "#3f1a2b",
      color: "white",
      confirmButtonText: "Ok",
    });
  }, [empleado]);

  const menuTareas = () => {
    return (
      <>
        <ListaTarjetas
          tipo={null}
          tareas={tareas}
          funcionBoton={completarTarea}
        />
        <CuerpoCentral
          funcionBoton={crearTarea}
          handleAbrirEntorno={handleAbrirEntorno}
        />
        <ListaTarjetas
          tipo={eliminarTarea}
          tareas={tareasCompletas}
          funcionBoton={descompletarTarea}
        />
      </>
    );
  };

  const menuIniciar = () => {
    return (
      <>
        <div></div>
        <div>
          <IniciarSesion handleLogin={handleLogin} />
          <ModalRegistrarse handleRegistrar={handleRegistrar} />
        </div>
      </>
    );
  };

  const configuarEmpleado = () => {
    setPagina("configuarEmpleado");
  };
  const mostrarTareas = () => {
    setPagina("mostrarTareas");
  };

  const handleNavbar = () => {
    return (
      <>
        <Navbar
          empleado={empleado}
          accion0={mostrarTareas}
          accion1={configuarEmpleado}
          accion2={cerrarSesion}
        />
      </>
    );
  };

  const menuUsuario = () => {
    return (
      <>
        <div>
          <ModalEditar
            empleado={empleado}
            handleEditar={editarUsuario}
            handleActualizarContraseña={handleActualizarContraseña}
          />
          <ModalCrearEnlace agregarEnlace={agregarEnlace} />
        </div>
        <ListaEnlaces empleado={empleado} eliminarEnlace={eliminarEnlace} />
      </>
    );
  };

  return (
    <div>
      {handleNavbar()}
      <Titulo sesionIniciada={sesionIniciada} />
      <div className="containerAstro">
        {sesionIniciada
          ? pagina === "configuarEmpleado"
            ? menuUsuario()
            : menuTareas()
          : menuIniciar()}
      </div>
    </div>
  );
};

export default Contenedor;
