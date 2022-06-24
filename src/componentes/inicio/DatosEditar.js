//Codigo creado por Javier Bagatoli el dia 08/06/2022

import React, { useEffect, useRef, useState } from 'react'
import { entradaValida, constraseñaValida, mailValido, validarNacimiento } from '../../helpers/validarEntradas'
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

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
    let [datosEmpleado, setDatosEmpleado] = useState(empleado)

    const nombreRef = useRef("")
    const apellidoRef = useRef("")
    const mailRef = useRef("")
    const paisRef = useRef("")
    const puestoRef = useRef("")
    const edadRef = useRef(0)
    const passwordRef = useRef("")
    const passwordRepRef = useRef("")

    useEffect(() => {
        nombreRef.current.value = datosEmpleado.nombre;
        apellidoRef.current.value = datosEmpleado.apellido;
        mailRef.current.value = datosEmpleado.mail;
        paisRef.current.value = datosEmpleado.pais;
        puestoRef.current.value = datosEmpleado.puesto;
        edadRef.current.valueAsNumber = datosEmpleado.edad;
        passwordRef.current.value = ("");
        passwordRepRef.current.value = ("");
    }, [datosEmpleado])
    

    const validar = () => {
        let texto = ""

        if (passwordRef.current.value !== passwordRepRef.current.value){
            texto = "Las contraseñas no son iguales";
        }
        if (!constraseñaValida(passwordRepRef.current.value) && passwordRepRef.current.value !== ""){
            texto = "Contraseña repetida no valido, solo usar letras y espacios"
        }
        if (!constraseñaValida(passwordRef.current.value) && passwordRef.current.value !== ""){
            texto = "Contraseña  no valida, solo usar letras y espacios"
        }
        texto = entradaValida(puestoRef.current.value,"Puesto no valido, solo usar letras y espacios")
       
        texto = entradaValida(paisRef.current.value,"Pais no valido, solo usar letras y espacios")

        texto = validarNacimiento(edadRef.current.valueAsNumber)

        if (!mailValido(mailRef.current.value)){
            texto = "Mail no valido, solo usar letras y espacios"

        }else{
            texto = "Mail ya ocupado"
        }

        texto = entradaValida(apellidoRef.current.value, "Apellido no valido, solo usar letras y espacios")

        texto = entradaValida(nombreRef.current.value, "Nombre no valido, solo usar letras y espacios")

        Swal.fire({
            title: 'Actualización fallida',
            text: texto,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })

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
                puesto: puestoRef.current.value,
                contraseña: hash,
                nacimiento: edadRef.current.valueAsNumber,
                entorno : [],
                tareas: [],
                tareasConcluidas : []
            }
            setDatosEmpleado(empleado)
            const MySwal = withReactContent(Swal)

            MySwal.fire({
            text: "En desarrollo",
            icon: "info",
            background: "#3f1a2b",
            color: "white",
            confirmButtonText: "Entendido", 
            showCloseButton: "true",
            imageUrl: "https://media0.giphy.com/media/DfxP2AmhATn6XTwipc/giphy.gif?cid=790b76113a1119f47fedd5f9cc16ea0cf9e2fdb59286b81e&rid=giphy.gif&ct=g",
            imageHeight: "250px"
            })
            
            handleEditar(empleado);
        }
        
    }
  return (
    <div>
        <div className='articulo login card'>
            <h1 className='card-header text-center'>Datos</h1>
                <div className='card-body list-group columna'>
                <div className='c1 columnas-2'>
                        <label className='c-1'>Nombre:</label>
                        <input ref={nombreRef} className="input-agregar-tarea c-2" type="text" placeholder="Nombre"/>
                    </div>
                    <div className='c2 columnas-2'>
                        <label className='c-1'>Apellido:</label>
                        <input ref={apellidoRef} className="input-agregar-tarea c-2" type="text" placeholder="Apellido"/>
                    </div>
                    <div className='c3 columnas-2'>
                        <label className='c-1'>Correo:</label>
                        <input ref={mailRef} className="input-agregar-tarea c-2" type="email" placeholder="Correo" pattern=".+@+.com" size="30" required/>
                    </div>
                    <div className='c4 columnas-2'>
                        <label className='c-1'>Puesto:</label>
                        <input ref={puestoRef} className="input-agregar-tarea c-2" type="text" placeholder="Puesto"/>
                    </div>
                    <div className='c5 columnas-2'>
                        <label className='c-1'>Pais:</label>
                        <select ref={paisRef} className="input-agregar-tarea c-2 ampliar">
                            <option value="Argentina">Argentina</option>
                            <option value="Chile">Chile</option>
                        </select>
                    </div>
                    <div className='c6 columnas-2'>
                        <label className='c-1'>Fecha nacimiento:</label>
                        <input ref={edadRef} className="input-agregar-tarea c-2" type="date"/>
                    </div>
                    <div className='c7 columnas-2'>
                        <label className='c-1'>Contraseña:</label>
                        <input ref={passwordRef} className="input-agregar-tarea c-2" type="password" placeholder="Contraseña"/>
                    </div>
                    <div className='c8 columnas-2'>
                        <label className='c-1'>Repita contraseña:</label>
                        <input ref={passwordRepRef} className="input-agregar-tarea c-2" type="password" placeholder="Repita la contraseña"/>
                    </div>
                    <button onClick={() => validar()} className="boton  boton-centrar c9">Modificar</button>
                </div>
        </div>
    </div>
  )
}

export default DatosEditar