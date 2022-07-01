import React from "react";
import Swal from "sweetalert2";
import EliminarSVG from "../../svg/eliminar.svg";
import LapizSVG from "../../svg/lapiz.svg";

const Enlace = ({ enlace, eliminarEnlace }) => {
  const copiar = () => {
    navigator.clipboard.writeText(enlace.direccion);
    Swal.fire({
      title: "Enlace copiado",
      icon: "success",
      background: "#3f1a2b",
      confirmButtonText: "Cool",
    });
  };

  return (
    <>
      <div className=" item-tarea">
        <p className="tarea-estilo p-enlaces">{enlace.apodo}</p>
        <div>
          <button
            onClick={() => copiar()}
            className="boton-tarea item2"
            title="Descompletar"
            alt="Eliminar"
          >
            <img className="svg" src={LapizSVG} alt="Descompletar"></img>
          </button>

          <button
            onClick={() => eliminarEnlace(enlace)}
            className="boton-eliminar-tarea item1"
            title="Eliminar Permanente"
            alt="Eliminar"
          >
            <img className="svg" src={EliminarSVG} alt="Eliminar"></img>
          </button>
        </div>
      </div>
    </>
  );
};

export default Enlace;
