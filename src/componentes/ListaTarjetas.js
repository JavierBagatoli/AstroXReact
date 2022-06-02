//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'
import Tarjeta from './Tarjeta'
import TarjetaCompletada from './TarjetaCompletada'

const ListaTarjetas = ({tipo, tareas, funcionBoton}) => {
  return (
    <div className='card articulo'>
        <h1 className='card-header'>Tareas pendientes</h1>
        <div className='card-body'>
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
                    <Tarjeta
                        key={tarea.id}
                        tarea={tarea}
                        funcionBoton={funcionBoton}/>
                )
            )

            }
        </div>
    </div>
  )
}

export default ListaTarjetas