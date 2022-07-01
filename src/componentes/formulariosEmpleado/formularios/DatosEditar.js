//Codigo creado por Javier Bagatoli el dia 08/06/2022

import React, { useEffect, useRef, useState } from "react";
import { validacionesDeEditar } from "../../../helpers/validarEntradas";
import Swal from "sweetalert2";

const bcrypt = require("bcryptjs");

const DatosEditar = ({
  empleado,
  handleEditar,
  handleActualizarContraseña,
}) => {
  let [datosEmpleado, setDatosEmpleado] = useState(empleado);

  const nombreRef = useRef("");
  const apellidoRef = useRef("");
  const mailRef = useRef("");
  const paisRef = useRef("");
  const puestoRef = useRef("");
  const nacimientoRef = useRef(0);
  const passwordRef = useRef("");
  const passwordRepRef = useRef("");

  useEffect(() => {
    nombreRef.current.value = datosEmpleado.nombre;
    apellidoRef.current.value = datosEmpleado.apellido;
    mailRef.current.value = datosEmpleado.mail;
    paisRef.current.value = datosEmpleado.pais;
    puestoRef.current.value = datosEmpleado.puesto;
    nacimientoRef.current.valueAsNumber = datosEmpleado.nacimiento;
    passwordRef.current.value = "";
    passwordRepRef.current.value = "";
  }, [datosEmpleado]);

  const validar = async () => {
    let vectorErrores = [];
    let dtoEmpleado = {
      nombre: nombreRef.current.value,
      apellido: apellidoRef.current.value,
      mail: mailRef.current.value,
      pais: paisRef.current.value,
      puesto: puestoRef.current.value,
      nacimiento: nacimientoRef.current.valueAsNumber,
      contraseña: passwordRef.current.value,
      contraseñaRep: passwordRepRef.current.value,
    };

    vectorErrores = await validacionesDeEditar(dtoEmpleado, empleado.mail);

    let idBanderaFallida = await vectorErrores.findIndex(
      (bandera) => bandera !== undefined && bandera !== ""
    );

    if (idBanderaFallida !== -1) {
      Swal.fire({
        title: "Actualización fallida",
        text: vectorErrores,
        icon: "error",
        background: "#3f1a2b",
        confirmButtonText: "Cerrar",
      });
    }

    //Encriptar contraseña
    let hash;
    if (passwordRef.current.value !== "") {
      var salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(passwordRef.current.value, salt);
    } else {
      hash = datosEmpleado.contrasenia;
    }

    if (idBanderaFallida === -1) {
      let empleadoEditado = {
        id: empleado._id || empleado.id,
        nombre: nombreRef.current.value,
        apellido: apellidoRef.current.value,
        mail: mailRef.current.value,
        pais: paisRef.current.value,
        puesto: puestoRef.current.value,
        nacimiento: nacimientoRef.current.valueAsNumber,
        entorno: [],
        tareas: [],
        tareasConcluidas: [],
      };
      if (passwordRef.current.value !== "") {
        let nuevaContraseña = hash;
        handleActualizarContraseña(nuevaContraseña);
      }
      setDatosEmpleado(empleadoEditado);
      handleEditar(empleadoEditado);
    }
  };
  return (
    <div>
      <div className="articulo login card">
        <h1 className="card-header text-center">Datos</h1>
        <div className="card-body list-group columna">
          <div className="c1 columnas-2">
            <label className="c-1">Nombre:</label>
            <input
              ref={nombreRef}
              className="input-agregar-tarea c-2"
              type="text"
              placeholder="Nombre"
            />
          </div>
          <div className="c2 columnas-2">
            <label className="c-1">Apellido:</label>
            <input
              ref={apellidoRef}
              className="input-agregar-tarea c-2"
              type="text"
              placeholder="Apellido"
            />
          </div>
          <div className="c3 columnas-2">
            <label className="c-1">Correo:</label>
            <input
              ref={mailRef}
              className="input-agregar-tarea c-2"
              type="email"
              placeholder="Correo"
              pattern=".+@+.com"
              size="30"
              required
            />
          </div>
          <div className="c4 columnas-2">
            <label className="c-1">Puesto:</label>
            <input
              ref={puestoRef}
              className="input-agregar-tarea c-2"
              type="text"
              placeholder="Puesto"
            />
          </div>
          <div className="c5 columnas-2">
            <label className="c-1">Pais:</label>
            <select ref={paisRef} className="input-agregar-tarea c-2 ampliar">
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
            </select>
          </div>
          <div className="c6 columnas-2">
            <label className="c-1">Fecha nacimiento:</label>
            <input
              ref={nacimientoRef}
              className="input-agregar-tarea c-2"
              type="date"
            />
          </div>
          <div className="c7 columnas-2">
            <label className="c-1">Contraseña:</label>
            <input
              ref={passwordRef}
              className="input-agregar-tarea c-2"
              type="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="c8 columnas-2">
            <label className="c-1">Repita contraseña:</label>
            <input
              ref={passwordRepRef}
              className="input-agregar-tarea c-2"
              type="password"
              placeholder="Repita la contraseña"
            />
          </div>
          <button onClick={() => validar()} className="boton  boton-centrar c9">
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatosEditar;
