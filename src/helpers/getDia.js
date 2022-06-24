//Codigo por Javier Bagatol, 21/05/2022
const fechaActual = new Date();
const numeroDia = fechaActual.getDay();
const numDia = fechaActual.getDate();
const numMes = fechaActual.getMonth();
export const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
export const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function diaTexto() {
  return `${dias[numeroDia]} ${numDia} de ${meses[numMes]}`;
}

export function colorTexto() {
  alert("dia");
  if (numeroDia === 6 || numeroDia === 0) {
    return "diaNoLaboral";
  }
}

export function getDiaTitulo() {
  return diaTexto();
}
