//Codigo por Javier Bagatol, 21/05/2022
export function entradaValida(entrada){
    if (entrada.length < 3){
        return false
    }
    for (let letra in entrada){
        let caracter = entrada[letra].charCodeAt()
        if (noEsLetra(caracter)){
            return false
        }
    }
    return true
}

function noEsLetra(caracter){
    return ((caracter <= 64 || caracter >= 91) && (caracter <= 96 || caracter >= 123) && (caracter !== 32))
}

export function constraseñaValida(constraseña){
    if (constraseña.length < 8){
        return false
    }
    return true
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