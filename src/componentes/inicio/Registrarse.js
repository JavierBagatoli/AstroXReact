//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef, useState } from 'react'
import { entradaValida, constraseñaValida, mailValido } from '../../helpers/validarEntradas'
import { baseDatos } from '../baseDatos/baseFalsa'
const bcrypt = require('bcryptjs');

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
        if (edadRef.current.valueAsNumber > 0){
            const nacimiento = new Date(edadRef.current.valueAsNumber);
            const hoy = new Date();
            const nacimientoAño = nacimiento.getFullYear()
            const hoyAño = hoy.getFullYear()
            const nacimientoMes = nacimiento.getMonth()
            const hoyMes = hoy.getMonth()
            const nacimientoDia = nacimiento.getDate()
            const hoyDia = hoy.getDate()
            alert(hoyAño + " " + nacimientoAño)
            if (hoyAño - nacimientoAño < 18){
                texto = "Faltan Años para que la fecha sea valida"}
            if (hoyMes - nacimientoMes < 0 && texto === ""){
                texto = "Faltan meses para que la fecha sea valida"}
            if (hoyDia - nacimientoDia < 0 && texto === ""){
                texto = "Faltan Dias para que la fecha sea valida"}
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
        setTimeout(() => setRetroalimentacionTexto(""),4000)

        if (texto === ""){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(passwordRef.current.value, salt);
            let empleado = {
                id: Date.now(),
                nombre: nombreRef.current.value,
                apellido: apellidoRef.current.value,
                mail:mailRef.current.value,
                pais: paisRef.current.value,
                puesto: puestoRef.current.value,
                contrasenia: hash,
                edad: edadRef.current.valueAsNumber,
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
                    <div className='c1'>
                        <label >Nombre:</label>
                        <input ref={nombreRef} className="input-agregar-tarea" type="text" placeholder="Nombre"/>
                    </div>
                    <div className='c2'>
                        <label>Apellido:</label>
                        <input ref={apellidoRef} className="input-agregar-tarea" type="text" placeholder="Apellido"/>
                    </div>
                    <div className='c3'>
                        <label>Mail:</label>
                        <input ref={mailRef} className="input-agregar-tarea" type="email" placeholder="Mail" pattern=".+@+.com" size="30" required/>
                    </div>
                    <div className='c4'>
                        <label>Puesto:</label>
                        <input ref={puestoRef} className="input-agregar-tarea" type="text" placeholder="Puesto"/>
                    </div>
                    <div className='c5'>
                        <label>Pais:</label>
                        <select ref={paisRef} className="input-agregar-tarea">
                            <option value="Argentina">Argentina</option>
                            <option value="Chile">Chile</option>
                        </select>
                    </div>
                    <div className='c6'>
                        <label>Edad:</label>
                        <input ref={edadRef} className="input-agregar-tarea" type="date"/>
                    </div>
                    <div className='c7'>
                        <label>Constraseña:</label>
                        <input ref={passwordRef} className="input-agregar-tarea" type="password" placeholder="Contraseña"/>
                    </div>
                    <div className='c8'>
                        <label>Repita constraseña:</label>
                        <input ref={passwordRepRef} className="input-agregar-tarea" type="password" placeholder="Repita la contraseña"/>
                    </div>


                    



                    <button onClick={() => validar()} className="boton  boton-centrar c9">Agregar</button>
                    {retroalimentacionTexto !== "" &&
                     (
                      retroalimentacionTexto === "Agregado" 
                        ? <p ref={retroAlimentacion} className="verde c10">{retroalimentacionTexto}</p>
                        : <p ref={retroAlimentacion} className="rojo c10">{retroalimentacionTexto}</p>
                    )}
                        
                </div>
        </div>
    </div>
  )
}

export default Registrarse