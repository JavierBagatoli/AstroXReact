//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React, { useRef} from 'react'
import { entradaValida, constraseñaValida, mailValido, validarNacimiento } from '../../helpers/validarEntradas'
import { baseDatos } from '../baseDatos/baseFalsa'
import Swal from 'sweetalert2'
import * as servicio from '../servicios/empleadoService'

const bcrypt = require('bcryptjs');

const Registrarse = ({handleRegistrar}) => {

    const nombreRef = useRef("")
    const apellidoRef = useRef("")
    const mailRef = useRef("")
    const paisRef = useRef("")
    const puestoRef = useRef("")
    const edadRef = useRef(0)
    const passwordRef = useRef("")
    const passwordRepRef = useRef("")

    let datos = baseDatos;

    const validar = () => {
        let texto = []
        console.log(texto)

        if (passwordRef.current.value !== passwordRepRef.current.value){
            texto[0] = "Las contraseñas no son iguales";
        }

        texto[1] = constraseñaValida(passwordRepRef.current.value,"Contraseña repetida no valido, debe contener al menos 8 caracteres")

        texto[2] = constraseñaValida(passwordRef.current.value,"Contraseña no valida, debe contener al menos 8 caracteres")

        texto[3] = entradaValida(puestoRef.current.value,"Puesto no valido, solo usar letras y espacios")

        texto[4] = entradaValida(paisRef.current.value,"Pais no valido, solo usar letras y espacios")

        texto[5] = validarNacimiento(edadRef.current.valueAsNumber)

        if (!mailValido(mailRef.current.value)){
            texto[6] = "Correo no valido, solo usar letras y espacios"

        }else{
            let existeMail;

            let res = servicio.existeMail(mailRef.current.value)

            console.log("datos Devueltos: ", res);
          
            const {PromiseResult} = res
            console.log(PromiseResult);
            if(res === "Ya existe"){
                alert("Ya Existe")}

            existeMail = datos.find(persona => persona.mail === mailRef.current.value)
            if (existeMail !== undefined)
                {texto[7] = "Mail ya ocupado"}
        }

        texto[8] = entradaValida(apellidoRef.current.value, "Apellido no valido, solo usar letras y espacios")

        texto[9] = entradaValida(nombreRef.current.value, "Nombre no valido, solo usar letras y espacios")
        
        let idBanderaFallida = texto.findIndex(bandera => bandera !== undefined && bandera !== "")
        console.log(idBanderaFallida);

        if(idBanderaFallida !== -1){
            Swal.fire({
                title: 'Registro fallido',
                text: texto[idBanderaFallida],
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        }

        if (idBanderaFallida === -1){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(passwordRef.current.value, salt);
            let nuevoEmpleado = {
                id: Date.now(),
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
            Swal.fire({
                title: 'Registro completado',
                icon: 'success',
                confirmButtonText: 'ok'
              })
            handleRegistrar(nuevoEmpleado);
        }
        
    }

  return (
    <div>
        <div className='articulo login'>
            <h1 className=''>Registrarse</h1>
                <div className='columna'>
                    <div className='c1 columnas-2'>
                        <label className='c-1'>Nombre:</label>
                        <input ref={nombreRef} className="input-agregar-tarea c-2" type="text" placeholder="Nombre"/>
                    </div>
                    <div className='c2 columnas-2'>
                        <label className='c-1'>Apellido:</label>
                        <input ref={apellidoRef} className="input-agregar-tarea c-2" type="text" placeholder="Apellido"/>
                    </div>
                    <div className='c3 columnas-2'>
                        <label className='c-1'>Mail:</label>
                        <input ref={mailRef} className="input-agregar-tarea c-2" type="email" placeholder="Mail" pattern=".+@+.com" size="30" required/>
                    </div>
                    <div className='c4 columnas-2'>
                        <label className='c-1'>Puesto:</label>
                        <input ref={puestoRef} className="input-agregar-tarea c-2" type="text" placeholder="Puesto"/>
                    </div>
                    <div className='c5 columnas-2'>
                        <label className='c-1'>Pais:</label>
                        <select ref={paisRef} className="input-agregar-tarea c-2">
                            <option value="Argentina">Argentina</option>
                            <option value="Chile">Chile</option>
                        </select>
                    </div>
                    <div className='c6 columnas-2'>
                        <label className='c-1'>Edad:</label>
                        <input ref={edadRef} className="input-agregar-tarea c-2" type="date"/>
                    </div>
                    <div className='c7 columnas-2'>
                        <label className='c-1'>Constraseña:</label>
                        <input ref={passwordRef} className="input-agregar-tarea c-2" type="password" placeholder="Contraseña"/>
                    </div>
                    <div className='c8 columnas-2'>
                        <label className='c-1'>Repita constraseña:</label>
                        <input ref={passwordRepRef} className="input-agregar-tarea c-2" type="password" placeholder="Repita la contraseña"/>
                    </div>
                    <button onClick={() => validar()} className="boton  boton-centrar c9">Agregar</button>                        
                </div>
        </div>
    </div>
  )
}

export default Registrarse