import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EliminarSVG from "../../svg/eliminar.svg";
import LapizSVG from "../../svg/lapiz.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TarjetaInfoCompletada({
  tarea,
  funcionBoton,
  funcionEliminar,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const creacionEntrada = new Date(tarea.fechaCreacion);
  const creacion = creacionEntrada.toLocaleDateString();
  let completado = 0;
  if (tarea.fechaCompletado !== 0) {
    const completadoEntrada = new Date(tarea.fechaCompletado);
    completado = completadoEntrada.toLocaleDateString();
  } else {
    completado = "Sin completar";
  }

  let limite = 0;
  if (isNaN(tarea.fechaLimite)) {
    limite = "Sin fecha limite";
  } else {
    const limiteEntrada = new Date(tarea.fechaLimite + 86400000);
    limite = limiteEntrada.toLocaleDateString();
  }

  return (
    <div>
      <div className="fila-tarea item-tarea" onClick={() => handleOpen()}>
        <p className="tarea-estilo">{tarea.titulo}</p>
        <div className="container item2">
          <button
            onClick={() => funcionEliminar(tarea)}
            className="boton-eliminar-tarea item1"
            title="Eliminar Permanente"
            alt="Eliminar"
          >
            <img className="svg" src={EliminarSVG} alt="Eliminar"></img>
          </button>
          <button
            onClick={() => funcionBoton(tarea)}
            className="boton-tarea item2"
            title="Descompletar"
            alt="Eliminar"
          >
            <img className="svg" src={LapizSVG} alt="Descompletar"></img>
          </button>
        </div>
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
            <Typography id="transition-modal-title" variant="h4" component="h2">
              {tarea.titulo}
            </Typography>
            <Typography id="transition-modal-fecha-finalizacion" sx={{ mt: 2 }}>
              {tarea.descripcion}
            </Typography>
            <Typography id="transition-modal-fecha-finalizacion" sx={{ mt: 2 }}>
              Fecha creación: {creacion}
            </Typography>
            <Typography id="transition-modal-fecha-finalizacion" sx={{ mt: 2 }}>
              Fecha completado: {completado}
            </Typography>
            <Typography id="transition-modal-fecha-finalizacion" sx={{ mt: 2 }}>
              Fecha límite: {limite}
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => handleClose()}
            >
              cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
