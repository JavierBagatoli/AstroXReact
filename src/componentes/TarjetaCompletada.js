//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from "react";
import EliminarSVG from "../svg/eliminar.svg";
import LapizSVG from "../svg/lapiz.svg";

const TarjetaCompletada = ({ tarea, funcionBoton, funcionEliminar }) => {
  return (
    <div className="item-tarea">
      <p>{tarea.titulo}</p>
      <button
        onClick={() => funcionEliminar(tarea)}
        className="boton-eliminar-tarea"
        title="Eliminar Permanente"
        alt="Eliminar"
      >
        <img className="svg" src={EliminarSVG} alt="Eliminar"></img>
      </button>
      <button
        onClick={() => funcionBoton(tarea)}
        className="boton-tarea"
        title="Descompletar"
        alt="Eliminar"
      >
        <img className="svg" src={LapizSVG} alt="Descompletar"></img>
      </button>
    </div>
  );
};

export default TarjetaCompletada;
