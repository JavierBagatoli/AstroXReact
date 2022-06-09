import React, { useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import { entradaValida } from '../../helpers/validarEntradas'

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


export default function TransitionsModal({funcionBoton}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tareaValida, setTareaValida] = useState(true)
 
  const nombreRef = useRef("");
  const fechaRef = useRef("");
  const descripcionRef = useRef("");

  const handleCrearTarea = () => {
    let nombreValido = entradaValida(nombreRef.current.value);
    let descripcionValida = entradaValida(descripcionRef.current.value);
    if (nombreValido && descripcionValida){
        setTareaValida(true)
        let nuevaTarea = {
          id: Date.now(),
          nombre: nombreRef.current.value,
          descripcion: descripcionRef.current.value,
          fechaCreacion: Date.now(),
          fechaCompletdo: "",
          fechaLimite: fechaRef.current.valueAsNumber,
      }
      funcionBoton(nuevaTarea)
      handleClose()
    }else{
      setTareaValida(false)
    }
  }



  return (
    <div>
      <Button 
        className='boton'
        color='primary'
        onClick={handleOpen}
        >Crear tarea</Button>
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
          <Box sx={style} className="modal columna">
            <Typography 
              id="transition-modal-title" 
              variant="h6" 
              component="h2"
              className="c1"
              >
                Agregar Tarea
            </Typography>
            <TextField
                inputRef={nombreRef}
                id="parent-modal-input-nombre"
                label="Nombre tarea"  
                sx={{ mb: 2 }} 
                className='input-moda c2'         
              />
            <TextField
                inputRef={descripcionRef}
                id="parent-modal-input-nombre"
                label="Descripción"
                className='input-moda c3'
                          
              />
            <Typography 
              id="transition-modal-fecha-finalizacion" 
              sx={{ mt: 2 }}
              className="c4">
                Fecha finalización
              </Typography>
            <input 
              type={"date"}
              ref={fechaRef}
              className="c5"/>
            <Button 
              onClick={() => {
                handleCrearTarea()}}
              className="boton c6 verde">Crear</Button>
              <Button 
              onClick={() => {
                handleClose()}}
              className="boton c7 rojo">Cerrar</Button>
              {
                !tareaValida &&
                <Typography 
                id="transition-modal-fecha-finalizacion" 
                sx={{ mt: 2 }}>
                  Tanto el nombre como descripcion tienen que solo contener letras
                </Typography>
              }
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}