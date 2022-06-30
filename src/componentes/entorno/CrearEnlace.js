import React, { useRef, useState } from "react";

const CrearEnlace = ({ agregarEnlace, handleClose }) => {
  const [aperturaRapida, setAperturaRapida] = useState(false);
  const refApodo = useRef("");
  const refEnlace = useRef("");

  const handleCrearEnlace = () => {
    let nuevoEnlace = {
      id: Date.now(),
      apodo: refApodo.current.value,
      direccion: refEnlace.current.value,
      prioridad: aperturaRapida,
    };

    agregarEnlace(nuevoEnlace);
    handleClose();
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
        <input
          onClick={() => setAperturaRapida(!aperturaRapida)}
          type="checkbox"
        ></input>
        Apertura rapida
      </p>
      <div className="centrar c5">
        <button
          onClick={() => {
            handleCrearEnlace();
          }}
          className="boton boton-modal boton-verde item1"
        >
          Crear
        </button>
        <button
          onClick={() => {
            handleClose();
          }}
          className="boton boton-modal boton-rojo item2"
        >
          Cerrar
        </button>
      </div>
    </>
  );
};

export default CrearEnlace;
