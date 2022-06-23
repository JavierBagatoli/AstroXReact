//Codigo creado por Javier Bagatoli el dia 20/06/2022
import axios from "axios"

export const agregarTarea = async(tarea, email) => {
    return await axios.put("http://localhost:3001/api/empleados/agregarTarea",{
        mail: email,
        tarea: {
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fechaCreacion: tarea.fechaCreacion,
            fechaCompletado: tarea.fechaCompletado,
            fechaLimite: tarea.fechaLimite
        },
    })
}

export const quitarTarea = async(tarea, email) => {
    return await axios.put("http://localhost:3001/api/empleados/quitarTarea",{
        mail: email,
        tarea: {
            titulo: "",
            descripcion: "",
            fechaCreacion: tarea.fechaCreacion,
            fechaCompletado: "",
            fechaLimite: ""
        },
    })
}

export const completarTarea = async(tarea, email) => {
    return await axios.put("http://localhost:3001/api/empleados/completarTarea",{
        mail: email,
        tarea: {
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fechaCreacion: tarea.fechaCreacion,
            fechaCompletado: tarea.fechaCompletado,
            fechaLimite: tarea.fechaLimite
        },
    })
}
export const descompletarTarea = async(tarea, email) => {
    return await axios.put("http://localhost:3001/api/empleados/descompletarTarea",{
        mail: email,
        tarea: {
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fechaCreacion: tarea.fechaCreacion,
            fechaCompletado: tarea.fechaCompletado,
            fechaLimite: tarea.fechaLimite
        },
    })
}