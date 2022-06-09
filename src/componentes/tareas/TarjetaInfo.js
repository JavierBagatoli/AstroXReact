import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckSVG from '../../svg/check.svg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function TarjetaInfo({tarea, funcionBoton}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const creacionEntrada = new Date(tarea.fechaCreacion);
  const creacion = creacionEntrada.toLocaleDateString();
  const completadoEntrada = new Date(tarea.fechaCompletado);
  const completado = completadoEntrada.toLocaleDateString();
  const limiteEntrada = new Date(tarea.fechaLimite+86400000);
  const limite = limiteEntrada.toLocaleDateString();

  return (
    <div>
      <div className='item-tarea'>
        <p className='tarea-estilo' onClick={() => handleOpen()}>{tarea.nombre}</p>
        <button onClick={() => funcionBoton(tarea)} className='boton-tarea' title="Completará la tarea">
          <img className='svg' src={CheckSVG} alt="Terminar" title="Terminar"></img>  
        </button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} color="primary" className="modal">
            <Typography 
              id="transition-modal-title" 
              variant="h6" 
              component="h2">
                {tarea.nombre}
            </Typography>
            <Typography 
              id="transition-modal-fecha-finalizacion" 
              sx={{ mt: 2 }}>
                {tarea.descripcion}
              </Typography>
              <Typography 
              id="transition-modal-fecha-finalizacion"  
              sx={{ mt: 2 }}>
                Fecha Creación: {creacion}
              </Typography>
              <Typography 
              id="transition-modal-fecha-finalizacion" 
              sx={{ mt: 2 }}>
                Fecha Completado: {completado}
              </Typography>
              <Typography 
              id="transition-modal-fecha-finalizacion"  
              sx={{ mt: 2 }}>
                Fecha límite: {limite}
              </Typography>
            <Button 
              sx={{ mt: 2 }}
              variant='contained'
              onClick={() => (
                handleClose())}
              >cerrar</Button>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}