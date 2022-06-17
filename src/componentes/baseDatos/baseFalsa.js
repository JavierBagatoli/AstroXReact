//Codigo creado por Javier Bagatoli el dia 02/06/2022
export const baseDatos = [{
    id:0,
    nombre : "Javier",
    apellido: "Bagatoli",
    mail: "Javier",
    pais: "Argentina",
    contrasenia: "$2a$10$aGTYmz84817rUEtYscWYbu.Pbmn3EqFtuDa6OhKjuIMxoBmOWI.t2",
    edad : 22,
    puesto : "Ingeniero",
    entorno : [
        { id: 0,
          apodo: "Calendario",
          direccion:  "https://calendar.google.com/calendar/u/0/r",
          prioridad: true},
        { id: 1,
          apodo: "BackEnd",
          direccion: "http://localhost:8080/api/v1/Empleados",
          prioridad: false}
    ],
    tareas : [{
        id: 1,
        nombre: "Caminar",
        descripcion: "Esto es descripción",
        fechaCreacion: "33",
        fechaCompletdo: "22",
        fechaLimite: "11"
    },{
        id: 2,
        nombre: "Dormir",
        descripcion: "Esto es descripción2",
        fechaCreacion: "2",
        fechaCompletdo: "4",
        fechaLimite: "55"
    },{
        id: 3,
        nombre: "Mirar el cielo",
        descripcion: "Esto es descripción3",
        fechaCreacion: "2",
        fechaCompletdo: "3",
        fechaLimite: "4"
    }],
    tareasConcluidas : [{
        id: 4,
        nombre: "Caminars",
        descripcion: "",
        fechaCreacion: "",
        fechaCompletdo: "",
        fechaLimite: ""
    },{
        id: 5,
        nombre: "Dormirs",
        descripcion: "",
        fechaCreacion: "",
        fechaCompletdo: "",
        fechaLimite: ""
    },{
        id: 6,
        nombre: "Mirar el cielos",
        descripcion: "",
        fechaCreacion: "",
        fechaCompletdo: "",
        fechaLimite: ""
    }]

},{
    id:1,
    nombre : "Paki",
    contrasenia: "123",
    edad : 21,
    mail: "Paki",
    puesto : "Asistente",
    entorno : [
        { id: 0,
          direccion: "https://www.google.com"}
    ],
    tareas : [
        "Caminar", "Limpieza", "Revision de calculos"
    ],
    tareasConcluidas : [
        "Correr"
    ]
},]