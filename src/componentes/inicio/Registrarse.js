//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef, useState } from 'react'
import { entradaValida, constraseñaValida, mailValido } from '../../helpers/validarEntradas'
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
        if (!constraseñaValida(passwordRepRef.current.value)){
            texto = "Contraseña repetida no valido, debe contener al menos 8 caracteres"
        }
        if (!constraseñaValida(passwordRef.current.value)){
            texto = "Contraseña no valida, debe contener al menos 8 caracteres"
        }
        if (!entradaValida(puestoRef.current.value)){
            texto = "Puesto no valido, solo usar letras y espacios"
        }
        if (!entradaValida(paisRef.current.value)){
            texto = "Pais no valido, solo usar letras y espacios"
        }
        if (!mailValido(mailRef.current.value)){
            texto = "Mail no valido, solo usar letras y espacios"

        }else{
            let existeMail;
            existeMail = datos.find(persona => persona.mail === mailRef.current.value)
            if (existeMail !== undefined)
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
            let empleado = {
                id: Date.now(),
                nombre: nombreRef.current.value,
                apellido: apellidoRef.current.value,
                mail:mailRef.current.value,
                pais: paisRef.current.value,
                puesto: paisRef.current.value,
                contrasenia: passwordRef.current.value,
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
        <div className='articulo login'>
            <h1 className=''>Registrarse</h1>
                <div className='columna'>
                    <input ref={nombreRef} className="input-agregar-tarea c1" type="text" placeholder="Nombre"/>
                    <input ref={apellidoRef} className="input-agregar-tarea c2" type="text" placeholder="Apellido"/>
                    <input ref={mailRef} className="input-agregar-tarea c3" type="text" placeholder="Mail"/>
                    <input ref={paisRef} className="input-agregar-tarea c4" type="text" placeholder="Pais"/>
                    <input ref={puestoRef} className="input-agregar-tarea c5" type="text" placeholder="Puesto"/>
                    <input ref={edadRef} className="input-agregar-tarea c6" type="number" placeholder="Edad" min="18" max="80"/>
                    <input ref={passwordRef} className="input-agregar-tarea c7" type="password" placeholder="Contraseña"/>
                    <input ref={passwordRepRef} className="input-agregar-tarea c8" type="password" placeholder="Repita la contraseña"/>
                    <button onClick={() => validar()} className="boton  boton-centrar c9">Agregar</button>
                    {retroalimentacionTexto !== "" &&
                     (
                      retroalimentacionTexto === "Datos modificados" 
                        ? <p ref={retroAlimentacion} className="verde c10">{retroalimentacionTexto}</p>
                        : <p ref={retroAlimentacion} className="rojo c10">{retroalimentacionTexto}</p>
                    )}
                        
                </div>
        </div>
    </div>
  )
}

export default Registrarse