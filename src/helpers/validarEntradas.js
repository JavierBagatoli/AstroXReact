//Codigo por Javier Bagatol, 21/05/2022
export function entradaValida(entrada, error) {
  if (entrada.length < 3 || entrada === null) {
    return error;
  }
  for (let letra in entrada) {
    let caracter = entrada[letra].charCodeAt();
    if (noEsLetra(caracter)) {
      return error;
    }
  }
  return "";
}

function noEsLetra(caracter) {
  return (
    (caracter <= 64 || caracter >= 91) && //Alfabeto mayusculas
    (caracter <= 96 || caracter >= 123) && //Alfabeto minusculas
    (caracter <= 128 || caracter >= 165) && //Caracteres especiales
    caracter !== 32 //Espacio
  );
}

export function constraseñaValida(constraseña, error) {
  if (constraseña.length < 8) {
    return error;
  }
  return "";
}

function contraseñaFomato(str) {
  var re = /(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}/;
  return re.test(str);
}

export function mailValido(mail) {
  //const mail = "juan@gmail.com"
  if (mail.length < 5) {
    return false;
  }
  let arrobaPos = mail.indexOf("@");
  if (arrobaPos === -1) {
    return false;
  }
  let ultimoPunto = mail.lastIndexOf(".");
  if (ultimoPunto === -1) {
    return false;
  }

  if (arrobaPos > ultimoPunto) {
    return false;
  }

  return true;
}

export function validarNacimiento(fecha) {
  let texto = "";
  if (fecha > 0) {
    const nacimiento = new Date(fecha);
    const hoy = new Date();

    const nacimientoAño = nacimiento.getFullYear();
    const hoyAño = hoy.getFullYear();

    const nacimientoMes = nacimiento.getMonth();
    const hoyMes = hoy.getMonth();

    const nacimientoDia = nacimiento.getDate();
    const hoyDia = hoy.getDate();
    let años = hoyAño - nacimientoAño;
    let meses = hoyMes - nacimientoMes;
    let dias = hoyDia - nacimientoDia;

    if (años < 18) {
      if (meses > 0 && texto === "") {
        if (dias > 1 && texto === "") {
          return "Faltan Dias para que la fecha sea valida";
        }
        return "Faltan meses para que la fecha sea valida";
      }
      return "Faltan Años para que la fecha sea valida";
    }
  } else {
    return "fecha invalida";
  }
  return texto;
}

//29/08/2022 Javier bagatoli
export const listarErrores = (empleado) => {
  let vectorErrores = [];
  if (empleado.contraseña !== empleado.contraseñaRep) {
    vectorErrores[0] = "Las contraseñas no son iguales";
  }
  if (
    !constraseñaValida(empleado.contraseñaRep) &&
    empleado.contraseñaRep !== ""
  ) {
    vectorErrores[1] =
      "Contraseña repetida no valido, solo usar letras y espacios";
  }
  if (!constraseñaValida(empleado.contraseña) && empleado.contraseña !== "") {
    vectorErrores[2] = "Contraseña  no valida, solo usar letras y espacios";
  }
  vectorErrores[3] = entradaValida(
    empleado.puesto,
    "Puesto no valido, solo usar letras y espacios"
  );

  vectorErrores[4] = entradaValida(
    empleado.pais,
    "Pais no valido, solo usar letras y espacios"
  );

  vectorErrores[5] = validarNacimiento(empleado.nacimiento);

  if (!mailValido(empleado.mail)) {
    vectorErrores = "Mail no valido, solo usar letras y espacios";
  } else {
  }

  vectorErrores[6] = entradaValida(
    empleado.apellido,
    "Apellido no valido, solo usar letras y espacios"
  );

  vectorErrores[7] = entradaValida(
    empleado.nombre,
    "Nombre no valido, solo usar letras y espacios"
  );
  return vectorErrores;
};
