//Codigo por Javier Bagatol, 21/05/2022
import * as servicio from "../componentes/servicios/empleadoService";

export function textoValido(entrada, error) {
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

export function contraseñaFomato(str) {
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return !re.test(str);
}

export function mailValido(mail) {
  const patron = /^[^@]+@[^@]+.[a-zA-Z]{2,}$/;
  return patron.test(mail);
}

function validarNacimiento(fecha) {
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
          return "Faltan días para que la fecha sea valida";
        }
        return "Faltan meses para que la fecha sea valida";
      }
      return "Faltan años para que la fecha sea valida";
    }
  } else {
    return "fecha invalida";
  }
  return texto;
}

//29/08/2022 Javier bagatoli

export const listarErrores = async (empleado) => {
  let vectorErrores = [];

  vectorErrores[0] = textoValido(
    empleado.puesto,
    "Puesto no valido, solo usar letras y espacios"
  );

  vectorErrores[1] = textoValido(
    empleado.pais,
    "Pais no valido, solo usar letras y espacios"
  );

  vectorErrores[2] = validarNacimiento(empleado.nacimiento);

  vectorErrores[3] = textoValido(
    empleado.apellido,
    "Apellido no valido, solo usar letras y espacios"
  );

  vectorErrores[4] = textoValido(
    empleado.nombre,
    "Nombre no valido, solo usar letras y espacios"
  );
  return vectorErrores;
};

export const validarDatosContraseña = (empleado) => {
  let vectorErrores = [];
  if (empleado.contraseña !== empleado.contraseñaRep) {
    vectorErrores[0] = "Las contraseñas no son iguales";
  }

  if (
    contraseñaFomato(empleado.contraseñaRep) ||
    empleado.contraseñaRep === ""
  ) {
    vectorErrores[1] =
      "Contraseña repetida invalida, usar letras, mayúsculas y símbolos";
  }
  if (contraseñaFomato(empleado.contraseña) || empleado.contraseña === "") {
    vectorErrores[2] =
      "Contraseña invalida, usar letras, mayúsculas y símbolos";
  }

  return vectorErrores;
};

export const validarMailRegistrar = async (empleado) => {
  let vectorErrores = [];
  if (!mailValido(empleado.mail)) {
    vectorErrores[6] = "Correo no valido";
  } else {
    let res = await servicio.existeMail(empleado.mail);
    if (res === "Ya existe") {
      vectorErrores[7] = "Correo ya utilizado";
    }
  }
  return vectorErrores;
};

export const validarMailEditar = async (empleado, mailAnterior) => {
  let vectorErrores = [];
  if (!mailValido(empleado.mail)) {
    vectorErrores[6] = "Correo no valido";
  } else {
    let res = await servicio.existeMail(empleado.mail);
    if (res === "Ya existe") {
      vectorErrores[7] = "Correo ya utilizado";
    }
  }
  if (empleado.mail === mailAnterior) {
    vectorErrores[7] = "";
  }
  return vectorErrores;
};

export const validacionesDeRegistro = async (empleado) => {
  let vectorErrores = [];

  const errorNormales = await listarErrores(empleado);

  const errorContraseña = await validarDatosContraseña(empleado);

  const errorMail = await validarMailRegistrar(empleado);

  const errorDos = errorNormales.concat(errorContraseña);

  vectorErrores = errorDos.concat(errorMail);

  return vectorErrores;
};

export const validacionesDeEditar = async (empleado, mailAnterior) => {
  let vectorErrores = [];

  const errorNormales = await listarErrores(empleado);

  const errorMail = await validarMailEditar(empleado, mailAnterior);

  const errorDos = errorNormales.concat(errorMail);

  vectorErrores = errorDos;
  if (empleado.contraseña !== "") {
    const errorContraseña = await validarDatosContraseña(empleado);
    vectorErrores = errorDos.concat(errorContraseña);
  }
  return vectorErrores;
};
