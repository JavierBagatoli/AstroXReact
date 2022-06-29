//Codigo creado por Javier Bagatoli el dia 20/06/2022
import axios from "axios";

export const getEmpleados = async () => {
  return await axios
    .get("http://localhost:3001/api/empleados/Empleados")
    .then((res) => res.data.docs);
};
export const getEmpleado = async (mail, contraseña) => {
  return await axios
    .post("http://localhost:3001/api/empleados/Validar", {
      mail: mail,
      contraseña: contraseña,
    })
    .then((res) => res.data);
};

export const registrarEmpleado = async (empleado) => {
  return await axios.post("http://localhost:3001/api/empleados/CrearEmpleado", {
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    mail: empleado.mail,
    pais: empleado.pais,
    nacimiento: empleado.nacimiento,
    contraseña: empleado.contraseña,
    puesto: empleado.puesto,
    entorno: [],
    tareas: [],
  });
};

export const editarEmpleado = async (empleado) => {
  const id = empleado.id;
  return await axios.put(`http://localhost:3001/api/empleados/${id}`, {
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    mail: empleado.mail,
    pais: empleado.pais,
    nacimiento: empleado.nacimiento,
    puesto: empleado.puesto,
  });
};

export const existeMail = async (mail) => {
  return await axios
    .post("http://localhost:3001/api/empleados/ExisteMail", {
      mail: mail,
    })
    .then((res) => res.data.respuesta);
};
