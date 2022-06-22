import axios from "axios"

export const getEmpleados = async () => {
    return await axios.get("http://localhost:3001/api/empleados/Empleados"/*,{
        mail: "javier@mail.com",
        contraseña : "123"
    }*/).then(res => res.data.docs[0]).catch( err => err)
}
export const getEmpleado = async () => {
    return await axios.post("http://localhost:3001/api/empleados/Validar",{
        mail: "javier@mail.com",
        contraseña : "123"
    }).then(res => res.data).catch( err => err)
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

export const existeMail = async(mail, req) => {
    console.log(mail)
    const respuesta = await axios.post("http://localhost:3001/api/empleados/existeMail",{
        mail: mail
    }).then(res => res.data.respuesta)
    if (respuesta === "Ya existe"){
        return false
    }else{
        return true
    }
}