//Codigo por Javier Bagatol, 21/05/2022
const tituloDia = document.querySelector(".titulo-dia")
const fechaActual = new Date();
const numeroDia = fechaActual.getDay();
const numDia = fechaActual.getDate();
const numMes = fechaActual.getMonth();
export const dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
export const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]


function diaTexto(){
    return `${dias[numeroDia]} ${numDia} de ${meses[numMes]}`
}

export function colorTexto(){
    if (numeroDia === 6 || numeroDia === 0){
        tituloDia.classList.add("diaNoLaboral")
    }
}

export function getDiaTitulo(){
    return diaTexto();
}