//Codigo por Javier Bagatol, 21/05/2022
export function entradaValida(entrada, error){
    if (entrada.length < 3 || entrada === null){
        return error
    }
    for (let letra in entrada){
        let caracter = entrada[letra].charCodeAt()
        if (noEsLetra(caracter)){
            return error
        }
    }
    return ""
}

function noEsLetra(caracter){
    return ((caracter <= 64 || caracter >= 91) && (caracter <= 96 || caracter >= 123) && (caracter !== 32))
}

export function constraseñaValida(constraseña, error){
    if (constraseña.length < 8){
        return error
    }
    return ""
}

export function mailValido(mail){
    //const mail = "juan@gmail.com"
    if (mail.length < 5 ){
        return false
    }
    let arrobaPos = mail.indexOf("@");
    if (arrobaPos === -1){
        return false;
    }
    let ultimoPunto = mail.lastIndexOf(".")
    if (ultimoPunto === -1){
        return false;
    }

    if(arrobaPos > ultimoPunto){
        return false
    }

    return true
}

export function validarNacimiento(fecha){
    let texto = "";
    if (fecha > 0){
        const nacimiento = new Date(fecha);
        const hoy = new Date();

        const nacimientoAño = nacimiento.getFullYear()
        const hoyAño = hoy.getFullYear()

        const nacimientoMes = nacimiento.getMonth()
        const hoyMes = hoy.getMonth()

        const nacimientoDia = nacimiento.getDate()
        const hoyDia = hoy.getDate()
        let años = hoyAño - nacimientoAño
        let meses = hoyMes - nacimientoMes
        let dias = hoyDia - nacimientoDia
        alert( años + "/" + meses + "/"+ dias)
        
        if (hoyAño - nacimientoAño < 18){
            if (hoyMes - nacimientoMes > 0 && texto === ""){
                if (hoyDia - nacimientoDia > 1 && texto === ""){
                    return "Faltan Dias para que la fecha sea valida"}
                return "Faltan meses para que la fecha sea valida"
            }
            return "Faltan Años para que la fecha sea valida"}
        
        
    }else{
        return "fecha invalida"
    }
    return texto;
}