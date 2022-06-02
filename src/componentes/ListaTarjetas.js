import React from 'react'
import Tarjeta from './Tarjeta'
import TarjetaCompletada from './TarjetaCompletada'

const ListaTarjetas = ({tipo, tareas}) => {
  return (
    <div className='card articulo'>
        <h1 className='card-header'>Tareas pendientes</h1>
        <div className='card-body'>
            {tipo 
            ?(
               tareas?.map(tareaCompleta =>
                   <TarjetaCompletada
                        key={tareaCompleta.id}
                        nombre={tareaCompleta.nombre}
                   />
               )
            
               )
            :(
                tareas?.map(tarea =>
                    <Tarjeta
                        key={tarea.id}
                        nombre={tarea.nombre}/>
                )
            )

            }
        </div>
    </div>
  )
}

export default ListaTarjetas