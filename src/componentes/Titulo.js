import React from "react";
import { getDiaTitulo, colorTexto } from "../helpers/getDia";
//Codigo creado por Javier Bagatoli el dia 01/06/2022
const Titulo = ({ sesionIniciada }) => {
  const colorClass = () => {
    return "titulo-dia " + colorTexto();
  };
  return (
    <h1 className={colorClass()}>
      {sesionIniciada ? getDiaTitulo() : "Astro X"}
    </h1>
  );
};

export default Titulo;
