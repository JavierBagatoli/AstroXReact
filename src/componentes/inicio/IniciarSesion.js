//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef } from 'react'
import { constraseñaValida, mailValido } from '../../helpers/validarEntradas'
import Swal from 'sweetalert2'


const IniciarSesion = ({handleLogin}) => {

    const mailRef = useRef("")
    const passwordRef = useRef("")
    
    const validar = () => {
        let vectorErrores = ""

        vectorErrores = constraseñaValida(passwordRef.current.value,"Contraseña repetida no valido, debe contener al menos 8 caracteres")

        if(!mailValido(mailRef.current.value)){
            vectorErrores = "Mail no valido"
        }

        
        if(vectorErrores === ""){
                handleLogin(mailRef.current.value, passwordRef.current.value)
        }else{
          Swal.fire({
            title: 'Datos incorrectos',
            text: vectorErrores,
            icon: 'error',
            background: "#3f1a2b",
            color: "white",
            confirmButtonText: 'Cerrar'
        })
        }
        
    }
  return (
    <article>
        <div className="articulo login">
            <h1 className='card-header text-center'>Iniciar Sesión</h1>
            <div className="columna">
                <input ref={mailRef} className="input-agregar-tarea c1" type="mail" placeholder="Correo"/>
                <input ref={passwordRef} className="input-agregar-tarea c2" type="password" placeholder="Contraseña"/>
                <button onClick={() => validar()} id="boton-iniciar-sesion" className="boton c3 boton-centrar">Iniciar sesión</button>
            </div>
        </div>
    </article>
  )
}

export default IniciarSesion