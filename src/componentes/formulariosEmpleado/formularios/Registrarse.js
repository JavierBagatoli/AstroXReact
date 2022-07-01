//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef } from "react";
import { validacionesDeRegistro } from "../../../helpers/validarEntradas";
import Swal from "sweetalert2";

const bcrypt = require("bcryptjs");

const Registrarse = ({ handleRegistrar }) => {
  const nombreRef = useRef("");
  const apellidoRef = useRef("");
  const mailRef = useRef("");
  const paisRef = useRef("");
  const puestoRef = useRef("");
  const nacimientoRef = useRef(0);
  const passwordRef = useRef("");
  const passwordRepRef = useRef("");

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

    vectorErrores = await validacionesDeRegistro(dtoEmpleado);
    let idBanderaFallida = vectorErrores.findIndex(
      (bandera) => bandera !== undefined && bandera !== ""
    );

    if (idBanderaFallida !== -1) {
      Swal.fire({
        title: "Registro fallido",
        text: vectorErrores[idBanderaFallida],
        icon: "error",
        background: "#192649",
        color: "white",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#37202b",
      });
    }

    if (idBanderaFallida === -1) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(passwordRef.current.value, salt);
      let nuevoEmpleado = {
        id: Date.now(),
        nombre: nombreRef.current.value,
        apellido: apellidoRef.current.value,
        mail: mailRef.current.value,
        pais: paisRef.current.value,
        puesto: puestoRef.current.value,
        contraseña: hash,
        nacimiento: nacimientoRef.current.valueAsNumber,
        entorno: [],
        tareas: [],
        tareasConcluidas: [],
      };
      Swal.fire({
        title: "Registro completado",
        icon: "success",
        background: "#3f1a2b",
        color: "white",
        confirmButtonText: "ok",
      });
      handleRegistrar(nuevoEmpleado);
    }
  };

  return (
    <div>
      <div className="articulo login">
        <h1 className="">Registrarse</h1>
        <div className="columna">
          <div className="c1 columnas-2">
            <label className="c-1">Nombre:</label>
            <input
              ref={nombreRef}
              className="input-agregar-tarea c-2"
              type="text"
              placeholder="Ej: Manuel"
            />
          </div>
          <div className="c2 columnas-2">
            <label className="c-1">Apellido:</label>
            <input
              ref={apellidoRef}
              className="input-agregar-tarea c-2"
              type="text"
              placeholder="Ej: García"
            />
          </div>
          <div className="c3 columnas-2">
            <label className="c-1">Correo:</label>
            <input
              ref={mailRef}
              className="input-agregar-tarea c-2"
              type="email"
              placeholder="mgarcia@gmail.com"
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
              placeholder="Ej: Gerente"
            />
          </div>
          <div className="c5 columnas-2">
            <label className="c-1">Pais:</label>
            <select ref={paisRef} className="input-agregar-tarea c-2 ampliar">
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Colombia">Colombia</option>
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
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
