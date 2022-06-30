import React from "react";
import Enlace from "./Enlace";

const ListaEnlaces = ({ empleado, eliminarEnlace }) => {
  return (
    <article className="articulo">
      <h1>Lista de enlaces</h1>
      {empleado &&
        empleado.entorno.map((enlace, index) => (
          <Enlace enlace={enlace} key={index} eliminarEnlace={eliminarEnlace} />
        ))}
    </article>
  );
};

export default ListaEnlaces;
