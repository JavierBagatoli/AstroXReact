//Codigo creado por Javier Bagatoli el dia 08/06/2022

import React, { useEffect, useRef, useState } from 'react'
import { entradaValida, constraseñaValida, mailValido } from '../../helpers/validarEntradas'
import { baseDatos } from '../baseDatos/baseFalsa'
const bcrypt = require('bcryptjs');

//const initialEmpleado = {
//    nombre: "test",
//    apellido: "test2",
//    mail: "testMail",
//    pais: "ArgentinaTest",
//    puesto: "test",
//    edad: "-1",
//    contrasenia: "test"
//}

const DatosEditar = ({empleado, handleEditar}) => {
    const [retroalimentacionTexto, setRetroalimentacionTexto] = useState("")
    let [datosEmpleado, setDatosEmpleado] = useState(empleado)

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

    useEffect(() => {
        nombreRef.current.value = datosEmpleado.nombre;
        apellidoRef.current.value = datosEmpleado.apellido;
        mailRef.current.value = datosEmpleado.mail;
        paisRef.current.value = datosEmpleado.pais;
        puestoRef.current.value = datosEmpleado.puesto;
        edadRef.current.value = datosEmpleado.edad;
        passwordRef.current.value = ("");
        passwordRepRef.current.value = ("");
    }, [datosEmpleado])
    

    const validar = () => {
        let texto = ""

        if (passwordRef.current.value !== passwordRepRef.current.value){
            texto = "Las contraseñas no son iguales";
        }
        if (!constraseñaValida(passwordRepRef.current.value)&& passwordRepRef.current.value !== ""){
            texto = "Contraseña repetida no valido, solo usar letras y espacios"
        }
        if (!constraseñaValida(passwordRef.current.value) && passwordRef.current.value !== ""){
            texto = "Contraseña  no valida, solo usar letras y espacios"
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
                {if (existeMail !== empleado)
                     texto = "Mail ya ocupado"}
        }

        if (!entradaValida(apellidoRef.current.value)){
            texto = "Apellido no valido, solo usar letras y espacios"
        }
        if (!entradaValida(nombreRef.current.value)){
            texto = "Nombre no valido, solo usar letras y espacios"
        }
        setRetroalimentacionTexto(texto)
        setTimeout(() => setRetroalimentacionTexto(""),4000)
        let hash
        if(passwordRef.current.value !== ""){
            var salt = bcrypt.genSaltSync(10);
            hash = bcrypt.hashSync(passwordRef.current.value, salt);
        }else{
            hash = datosEmpleado.contrasenia
        }
        if (texto === ""){
            let empleado = {
                id: datosEmpleado.id,
                nombre: nombreRef.current.value,
                apellido: apellidoRef.current.value,
                mail:mailRef.current.value,
                pais: paisRef.current.value,
                puesto: paisRef.current.value,
                edad : edadRef.current.value,
                contrasenia: hash,
                entorno : datosEmpleado.entorno,
                tareas: datosEmpleado.tareas,
                tareasConcluidas : datosEmpleado.tareasConcluidas
            }
            setRetroalimentacionTexto("Datos modificados");
            handleEditar(empleado);
        }
        
    }
  return (
    <div>
        <div className='articulo login card'>
            <h1 className='card-header text-center'>Datos</h1>
                <div className='card-body list-group columna'>
                    <input ref={nombreRef} className="input-agregar-tarea c1" type="text" placeholder="Nombre"/>
                    <input ref={apellidoRef} className="input-agregar-tarea c2" type="text" placeholder="Apellido"/>
                    <input ref={mailRef} className="input-agregar-tarea c3" type="text" placeholder="Mail"/>
                    <input ref={paisRef} className="input-agregar-tarea c4" type="text" placeholder="Pais"/>
                    <input ref={puestoRef} className="input-agregar-tarea c5" type="text" placeholder="Puesto"/>
                    <input ref={edadRef} className="input-agregar-tarea c6" type="number" placeholder="Edad" min="18" max="80"/>
                    <input ref={passwordRef} className="input-agregar-tarea c7" type="password" placeholder="Contraseña"/>
                    <input ref={passwordRepRef} className="input-agregar-tarea c8" type="password" placeholder="Repita la contraseña"/>
                    <button onClick={() => validar()} className="boton  boton-centrar c9">Modificar</button>
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

export default DatosEditar