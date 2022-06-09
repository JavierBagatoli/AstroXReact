//Codigo creado por Javier Bagatoli el dia 02/06/2022
import React from 'react'
import TransitionsModal from './tareas/TransitionsModal'

const CuerpoCentral = ({funcionBoton}) => {

  return (
    <div className='container'>
      <section className='centrar'>
        <button className='boton-ambito-trabajo'>Ámbiente de trabajo</button>
          <article className='container'>
              <TransitionsModal
                funcionBoton={funcionBoton}
                className='centrar'/>
          </article>
        </section>
    </div>
  )
}

export default CuerpoCentral