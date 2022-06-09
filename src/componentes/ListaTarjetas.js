//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'
import TarjetaCompletada from './TarjetaCompletada'
import TarjetaInfo from './tareas/TarjetaInfo'

const ListaTarjetas = ({tipo, tareas, funcionBoton}) => {
  return (
    <div className='articulo'>
        <h1 className=''>
            {
                tipo? "Tareas completas":  "Tareas pendientes"
            }
            
            
            </h1>
        <div className=''>
            {tipo 
            ?(
               tareas.map(tareaCompleta =>
                
                <TarjetaCompletada
                        key={tareaCompleta.id}
                        tarea={tareaCompleta}
                        funcionBoton={funcionBoton}
                        funcionEliminar={tipo}
                   />
               )
            
               )
            :(
                tareas.map(tarea =>
                    <TarjetaInfo
                        key={tarea.id}
                        tarea={tarea}
                        funcionBoton={funcionBoton}
                    />
                )
            )

            }
        </div>
    </div>
  )
}

export default ListaTarjetas