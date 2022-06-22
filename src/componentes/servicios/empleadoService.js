import axios from "axios"

export const getEmpleados = async () => {
    return await axios.get("http://localhost:3001/api/empleados/Empleados")
        .then(res => res.data.docs)
}
export const getEmpleado = async (mail, contraseña) => {
    return await axios.post("http://localhost:3001/api/empleados/Validar",{
        mail: mail,
        contraseña : contraseña
    }).then(res => res.data)
}

export const registrarEmpleado = async(empleado) => {
    return await axios.post("http://localhost:3001/api/empleados/CrearEmpleado",{
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        mail: empleado.mail,
        pais: empleado.pais,
        nacimiento: empleado.nacimiento,
        contraseña: empleado.contraseña,
        puesto: empleado.puesto,
        entorno: [],
        tareas: [],
        tareasConcluidas: []
    })
}

export const existeMail = async(mail) => {
    console.log(mail)
    return await axios.post("http://localhost:3001/api/empleados/ExisteMail",{
        mail: mail
    }).then(res => res.data.respuesta)
}