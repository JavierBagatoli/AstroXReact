//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef, useState } from 'react'
import { constraseñaValida, mailValido } from '../../helpers/validarEntradas'


const IniciarSesion = ({handleLogin}) => {
    const [retroAlimentacion, setRetroAlimentacion] = useState("")

    const mailRef = useRef("")
    const passwordRef = useRef("")

    console.log(retroAlimentacion)
    const validar = () => {
        let texto = ""

        //if(!constraseñaValida(passwordRef.current.value)){
        //    texto = "Contraseña  invalida, debe tener al menos 8 caracteres"
        //}
        //if(!mailValido(mailRef.current.value)){
        //    texto = "Mail no valido"
        //}
        setRetroAlimentacion(texto)
        if(texto === ""){
                handleLogin(mailRef.current.value, passwordRef.current.value)
            }
        
    }
  return (
    <article>
        <div className="articulo login">
            <h1 className='card-header text-center'>Iniciar Sesión</h1>
            <div className="columna">
                <input ref={mailRef} className="input-agregar-tarea c1" type="mail" placeholder="Mail"/>
                <input ref={passwordRef} className="input-agregar-tarea c2" type="password" placeholder="Contraseña"/>
                <button onClick={() => validar()} id="boton-iniciar-sesion" className="boton c3 boton-centrar">Iniciar sesión</button>
                {retroAlimentacion !== "" &&
                      (retroAlimentacion === "Datos modificados" 
                        ? <p className="verde c10">{retroAlimentacion}</p>
                        : <p className="rojo c10">{retroAlimentacion}</p>)}
            </div>
        </div>
    </article>
  )
}

export default IniciarSesion