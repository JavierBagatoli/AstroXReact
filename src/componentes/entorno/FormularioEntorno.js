import React from "react";
import Enlace from "./Enlace";

const FormularioEntorno = ({ empleado, agregarEnlace }) => {
  return (
    <article className="articulo">
      <h1>Lista de enlaces</h1>
      {empleado &&
        empleado.entorno.map((enlace, index) => (
          <Enlace enlace={enlace} key={index} />
        ))}
    </article>
  );
};

export default FormularioEntorno;
