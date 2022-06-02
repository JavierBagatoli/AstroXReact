import React, { useRef, useState } from 'react'
import { entradaValida } from '../../helpers/validarEntradas'
import { baseDatos } from '../baseDatos/baseFalsa'

const Registrarse = ({handleLogin}) => {
    const [retroalimentacionTexto, setRetroalimentacionTexto] = useState("")

    const nombreRef = useRef("")
    const apellidoRef = useRef("")
    const mailRef = useRef("")
    const paisRef = useRef("")
    const puestoRef = useRef("")
    const edadRef = useRef(0)
    const passwordRef = useRef("")
    const passwordRepRef = useRef("")
    const retroAlimentacion = useRef("")

    let datos = baseDatos;

    const validar = () => {
        let texto = ""

        if (passwordRef.current.value !== passwordRepRef.current.value){
            texto = "Las contraseñas no son iguales";
        }
        if (!entradaValida(passwordRepRef.current.value)){
            texto = "Password repetido no valido, solo usar letras y espacios"
        }
        if (!entradaValida(passwordRef.current.value)){
            texto = "Password no valido, solo usar letras y espacios"
        }
        if (!entradaValida(puestoRef.current.value)){
            texto = "Puesto no valido, solo usar letras y espacios"
        }
        if (!entradaValida(paisRef.current.value)){
            texto = "Pais no valido, solo usar letras y espacios"
        }
        if (!entradaValida(mailRef.current.value)){
            texto = "Mail no valido, solo usar letras y espacios"

        }else{
            let existeMail = false;
            existeMail = datos.find(persona => persona.mail === mailRef.current.value)
            if (existeMail !== false)
                {texto = "Mail ya ocupado"}
        }

        if (!entradaValida(apellidoRef.current.value)){
            texto = "Apellido no valido, solo usar letras y espacios"
        }
        if (!entradaValida(nombreRef.current.value)){
            texto = "Nombre no valido, solo usar letras y espacios"
        }
        setRetroalimentacionTexto(texto)

        if (texto === ""){
            alert("hola")
            let empleado = {
                id: new Date.now(),
                nombre: nombreRef.current.value,
                apellido: apellidoRef.current.value,
                mail:mailRef.current.value,
                pais: paisRef.current.value,
                puesto: paisRef.current.value,
                password: passwordRef.current.value,
                entorno : [],
                tareas: [],
                tareasConcluidas : []
            }
            baseDatos.push(empleado);
            console.log(datos);
            setRetroalimentacionTexto("Agregado");
            handleLogin(empleado.id);
        }
        
    }

  return (
    <div>
        <div className='articulo login card'>
            <h1 className='card-header text-center'>Registrarse</h1>
                <div className='card-body list-group'>
                    <input ref={nombreRef} className="input-agregar-tarea" type="text" placeholder="Nombre"/>
                    <input ref={apellidoRef} className="input-agregar-tarea" type="text" placeholder="Apellido"/>
                    <input ref={mailRef} className="input-agregar-tarea" type="text" placeholder="Mail"/>
                    <input ref={paisRef} className="input-agregar-tarea" type="text" placeholder="Pais"/>
                    <input ref={puestoRef} className="input-agregar-tarea" type="text" placeholder="Puesto"/>
                    <input ref={edadRef} className="input-agregar-tarea" type="number" placeholder="Edad" min="18" max="80"/>
                    <input ref={passwordRef} className="input-agregar-tarea" type="password" placeholder="Contraseña"/>
                    <input ref={passwordRepRef} className="input-agregar-tarea" type="password" placeholder="Repita la contraseña"/>
                    <button onClick={() => validar()} className="boton  boton-centrar">Agregar</button>
                    <p ref={retroAlimentacion} className="c7">{retroalimentacionTexto}</p>
                        
                </div>
        </div>
    </div>
  )
}

export default Registrarse