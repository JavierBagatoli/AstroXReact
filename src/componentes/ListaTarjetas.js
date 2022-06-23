//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'
import TarjetaInfoCompletada from './tareas/TarjetaInfoCompletada'
import TarjetaInfo from './tareas/TarjetaInfo'

const ListaTarjetas = ({tipo, tareas, funcionBoton}) => {

    const colorTarea = () => {
        return "rojo"
    }
  return (
    <div className='articulo'>
        <h1 className=''>
            {
                tipo? "Tareas completadas":  "Tareas pendientes"
            }
            
            
            </h1>
        <div className=''>
            {tipo 
            ?(
               tareas.map(tareaCompleta =>
                
                //<TarjetaCompletada
                //        key={tareaCompleta.fechaCreacion}
                //        tarea={tareaCompleta}
                //        funcionBoton={funcionBoton}
                //        funcionEliminar={tipo}
                //   />
                <TarjetaInfoCompletada
                   key={tareaCompleta.fechaCreacion}
                   tarea={tareaCompleta}
                   funcionBoton={funcionBoton}
                   funcionEliminar={tipo}
               />  
               )
            
               )
            :(
                tareas.map(tarea => {
                    let color = colorTarea();
                    return <TarjetaInfo
                        key={tarea.fechaCreacion}
                        tarea={tarea}
                        funcionBoton={funcionBoton}
                        color={color}
                    />
                    }
                )
            )

            }
        </div>
    </div>
  )
}

export default ListaTarjetas