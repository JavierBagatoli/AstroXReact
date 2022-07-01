import React from "react";
import Enlace from "./Enlace";

const ListaEnlaces = ({ entorno, eliminarEnlace }) => {
  return (
    <article className="articulo">
      <h1>Lista de enlaces</h1>
      {entorno !== undefined &&
        entorno.map((enlace) => {
          return (
            <Enlace
              enlace={enlace}
              key={enlace.id}
              eliminarEnlace={eliminarEnlace}
            />
          );
        })}
    </article>
  );
};

export default ListaEnlaces;
