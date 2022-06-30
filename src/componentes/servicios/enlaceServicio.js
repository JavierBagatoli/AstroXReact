//Codigo creado por Javier Bagatoli el dia 30/06/2022
import axios from "axios";

export const agregarEnlace = async (enlace, email) => {
  return await axios.put("http://localhost:3001/api/empleados/agregarEnlace", {
    mail: email,
    enlace: {
      id: enlace.id,
      apodo: enlace.apodo,
      direccion: enlace.direccion,
      prioridad: enlace.prioridad,
    },
  });
};

export const eliminarEnlace = async (enlace, email) => {
  console.log("muestra", enlace);
  return await axios.put("http://localhost:3001/api/empleados/quitarEnlace", {
    mail: email,
    enlace: {
      id: enlace.id,
      apodo: "",
      direccion: "",
      prioridad: "",
    },
  });
};
