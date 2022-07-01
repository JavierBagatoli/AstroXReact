//Codigo creado por Javier Bagatoli el dia 1/07/2022

import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { textoValido } from "../../helpers/validarEntradas";

const FormularioTareas = ({ enlace, handleEditar }) => {
  const [datosTarea, setdatosTarea] = useState(enlace);
  const [esLimite, setEsLimite] = useState(false);
  const tituloRef = useRef("");
  const descripcionRef = useRef("");
  const fechaLimiteRef = useRef("");

  useEffect(() => {
    tituloRef.current.value = datosTarea.nombre;
    descripcionRef.current.value = datosTarea.apellido;
    fechaLimiteRef.current.valueAsNumber = 0;
  }, [datosTarea]);

  const validar = async () => {
    let vectorErrores = [];
    let dtoenlace = {
      nombre: tituloRef.current.value,
      apellido: descripcionRef.current.value,
      mail: fechaLimiteRef.current.value,
    };
    //validaciones
    vectorErrores[0] = textoValido(
      dtoenlace.nombre,
      "Solo usar letras para titulo"
    );
    vectorErrores[1] = textoValido(
      dtoenlace.nombre,
      "Solo usar letras para descripción"
    );

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

    if (idBanderaFallida === -1) {
      let enlaceEditado = {
        id: enlace._id || enlace.id,
        nombre: tituloRef.current.value,
        apellido: descripcionRef.current.value,
        entorno: [],
        tareas: [],
        tareasConcluidas: [],
      };
      setdatosTarea(enlaceEditado);
      handleEditar(enlaceEditado);
    }
  };
  return (
    <div>
      <div className="articulo login card">
        <h1 className="card-header text-center">Datos</h1>
        <div className="card-body list-group columna">
          <div className="c1 columnas-2">
            <input
              ref={tituloRef}
              className="input-agregar-tarea c-2"
              type="text"
              placeholder="Titulo"
            />
          </div>
          <div className="c2 columnas-2">
            <input
              ref={descripcionRef}
              className="input-agregar-tarea c-2"
              type="text"
              placeholder="descripción"
            />
          </div>
          <div className="c3 columnas-2">
            {esLimite === true && (
              <input type={"date"} ref={fechaLimiteRef} className="c5" />
            )}
          </div>
          <button onClick={() => validar()} className="boton  boton-centrar c9">
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioTareas;
