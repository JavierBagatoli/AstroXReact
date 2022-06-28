import React, { useRef } from "react";

const CrearEnlace = ({ agregarEnlace }) => {
  const refApodo = useRef("");
  const refEnlace = useRef("");
  const refAperturaRapida = useRef("");

  const handleCrearEnlace = () => {
    let nuevoEnlace = {
      id: 3,
      apodo: refApodo.current.value,
      direccion: refEnlace.current.value,
      prioridad: false,
    };

    agregarEnlace(nuevoEnlace);
  };
  return (
    <>
      <h1>Crear enlace</h1>
      <input
        ref={refApodo}
        className="input-moda c2"
        type="text"
        placeholder="Apodo"
      ></input>
      <input
        ref={refEnlace}
        className="input-moda c3"
        type="text"
        placeholder="Enlace"
      ></input>
      <p className="centrar c4">
        <input type="checkbox"></input>
        Apertura rapida
      </p>
      <div className="centrar c5">
        <button
          ref={refAperturaRapida}
          onClick={() => {
            handleCrearEnlace();
          }}
          className="boton"
        >
          Crear
        </button>
      </div>
    </>
  );
};

export default CrearEnlace;
