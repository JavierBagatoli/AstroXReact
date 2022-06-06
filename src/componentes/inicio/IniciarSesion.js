import React, { useRef, useState } from 'react'
import { entradaValida } from '../../helpers/validarEntradas'
import { baseDatos } from '../baseDatos/baseFalsa'

const datos = baseDatos;

const IniciarSesion = ({handleLogin}) => {
    const [retroAlimentacion, setRetroAlimentacion] = useState("")

    const mailRef = useRef("")
    const passwordRef = useRef("")

    const validar = () => {
        let texto = ""

        //if(!entradaValida(passwordRef.current.value)){
        //    texto = "Password no valida"
        //}
        if(!entradaValida(mailRef.current.value)){
            texto = "Mail no valido"
        }
        setRetroAlimentacion(texto)
        if(texto === ""){
            let personaIdentificada =datos.find(persona => persona.nombre === mailRef.current.value)
            if (personaIdentificada !== undefined){
                if (personaIdentificada.contrasenia === passwordRef.current.value){
                    console.log(personaIdentificada.id)
                     handleLogin(personaIdentificada.id)
                }
            }
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
                <p id="retroalimentacionInicioSesion" className="c4">{retroAlimentacion}</p>
            </div>
        </div>
    </article>
  )
}

export default IniciarSesion