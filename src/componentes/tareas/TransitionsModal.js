import React, { useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import { red } from '@mui/material/colors';

const color = red[500];

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
 
  const nombreRef = useRef("");
  const fechaRef = useRef("");

  const handleCrearTarea = () => {
    let nuevaTarea = {
      id: Date.now(),
      nombre: nombreRef.current.value,
      descripcion: "",
      fechaCreacion: fechaRef.current.value,
      fechaCompletdo: "",
      fechaLimite: ""
  }
  console.log(nombreRef)
  console.log(nuevaTarea)
  funcionBoton(nuevaTarea)
  }



  return (
    <div>
      <Button 
        variant="contained"
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
          <Box sx={style} color="primary">
            <Typography 
              id="transition-modal-title" 
              variant="h6" 
              component="h2" 
              color="primary">
                Agregar Tarea
            </Typography>
            <Typography 
              id="transition-modal-description" 
              sx={{ mt: 2 }} 
              color="primary">
                Nombre tarea
            </Typography>
            <TextField
                inputRef={nombreRef}
                id="parent-modal-input-nombre"
                label="Nombre tarea"             
              />
            <Typography 
              id="transition-modal-fecha-finalizacion" 
              color="primary" 
              sx={{ mt: 2 }}>
                Fecha finalizacion
              </Typography>
            <input 
              type={"date"}
              ref={fechaRef}
              ></input>
            <Button 
              variant='contained'
              onClick={() => (
                handleCrearTarea(),
                handleClose())}
              >Crear</Button>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}